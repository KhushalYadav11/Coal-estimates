import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertMeasurementSchema, COAL_TYPES, VOLUME_METHODS } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const result = insertProjectSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: fromZodError(result.error).toString() });
      }
      const project = await storage.createProject(result.data);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const result = insertProjectSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: fromZodError(result.error).toString() });
      }
      const project = await storage.updateProject(req.params.id, result.data);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Project Stats
  app.get("/api/projects/:id/stats", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      const stats = await storage.getProjectStats(req.params.id);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project stats" });
    }
  });

  // Measurements
  app.get("/api/projects/:projectId/measurements", async (req, res) => {
    try {
      const measurements = await storage.getMeasurements(req.params.projectId);
      res.json(measurements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch measurements" });
    }
  });

  app.get("/api/measurements/:id", async (req, res) => {
    try {
      const measurement = await storage.getMeasurement(req.params.id);
      if (!measurement) {
        return res.status(404).json({ error: "Measurement not found" });
      }
      res.json(measurement);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch measurement" });
    }
  });

  app.post("/api/measurements", async (req, res) => {
    try {
      const result = insertMeasurementSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: fromZodError(result.error).toString() });
      }
      const measurement = await storage.createMeasurement(result.data);
      res.status(201).json(measurement);
    } catch (error) {
      res.status(500).json({ error: "Failed to create measurement" });
    }
  });

  app.delete("/api/measurements/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteMeasurement(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Measurement not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete measurement" });
    }
  });

  // Calculate endpoint
  app.post("/api/calculate", async (req, res) => {
    try {
      const schema = z.object({
        length: z.number().positive(),
        width: z.number().positive(),
        height: z.number().positive(),
        coalType: z.string(),
        volumeMethod: z.string(),
      });

      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: fromZodError(result.error).toString() });
      }

      const { length, width, height, coalType, volumeMethod } = result.data;

      const coalData = COAL_TYPES[coalType as keyof typeof COAL_TYPES];
      const volumeCalc = VOLUME_METHODS[volumeMethod as keyof typeof VOLUME_METHODS];

      if (!coalData || !volumeCalc) {
        return res.status(400).json({ error: "Invalid coal type or volume method" });
      }

      const volume = volumeCalc.calculate(length, width, height);
      const weight = volume * coalData.density; // Convert g/cm³ to MT/m³

      // Determine quality based on dimensional consistency
      let quality: "excellent" | "good" | "fair" | "poor" = "good";
      const ratio = Math.max(length, width) / Math.min(length, width);
      if (ratio < 2 && height > 2) quality = "excellent";
      else if (ratio > 5 || height < 1) quality = "fair";
      else if (ratio > 8) quality = "poor";

      res.json({
        volume,
        weight,
        quality,
        coalDensity: coalData.density,
        accuracy: volumeCalc.accuracy,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate" });
    }
  });

  // Analytics
  app.get("/api/analytics/today", async (req, res) => {
    try {
      const count = await storage.getTodayMeasurementCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.get("/api/analytics/overview", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      const allMeasurements = await Promise.all(
        projects.map((p) => storage.getMeasurements(p.id))
      );
      
      const measurements = allMeasurements.flat();
      const totalVolume = measurements.reduce((sum, m) => sum + m.calculatedVolume, 0);
      const totalWeight = measurements.reduce((sum, m) => sum + m.calculatedWeight, 0);
      
      const qualityCount = {
        excellent: measurements.filter((m) => m.quality === "excellent").length,
        good: measurements.filter((m) => m.quality === "good").length,
        fair: measurements.filter((m) => m.quality === "fair").length,
        poor: measurements.filter((m) => m.quality === "poor").length,
      };
      
      const coalTypeCount: Record<string, number> = {};
      measurements.forEach((m) => {
        coalTypeCount[m.coalType] = (coalTypeCount[m.coalType] || 0) + 1;
      });

      res.json({
        totalMeasurements: measurements.length,
        totalVolume,
        totalWeight,
        qualityCount,
        coalTypeCount,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch overview" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
