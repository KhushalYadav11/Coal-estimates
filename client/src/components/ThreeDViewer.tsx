import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Ruler } from "lucide-react";

interface ThreeDViewerProps {
  modelLoaded?: boolean;
  measurementMode?: boolean;
  onMeasurementToggle?: () => void;
}

export function ThreeDViewer({
  modelLoaded = false,
  measurementMode = false,
  onMeasurementToggle,
}: ThreeDViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    mesh?: THREE.Mesh;
    animationId?: number;
  }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    let animationId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);
      
      camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(5, 5, 8);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    if (modelLoaded) {
      const geometry = new THREE.ConeGeometry(3, 4, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.7,
        metalness: 0.3,
      });
      const coalPile = new THREE.Mesh(geometry, material);
      coalPile.position.y = 2;
      scene.add(coalPile);
      sceneRef.current.mesh = coalPile;

      if (measurementMode) {
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00aaff });
        const points = [
          new THREE.Vector3(-3, 0, 0),
          new THREE.Vector3(3, 0, 0),
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      }
    }

    sceneRef.current = { scene, camera, renderer };

    const animate = () => {
      if (isRotating && sceneRef.current.mesh) {
        sceneRef.current.mesh.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      // Properly dispose of Three.js resources
      if (renderer) {
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      // Dispose of geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
    } catch (error) {
      console.warn("WebGL not available:", error);
      return;
    }
  }, [modelLoaded, measurementMode, isRotating]);

  return (
    <div className="relative h-full w-full bg-gray-950 rounded-md overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      
      {!modelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-muted-foreground text-lg mb-2">
              No 3D Model Loaded
            </div>
            <div className="text-muted-foreground/60 text-sm">
              Upload a .obj file to begin
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsRotating(!isRotating)}
          data-testid="button-rotation-toggle"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          data-testid="button-zoom-in"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          data-testid="button-zoom-out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          data-testid="button-fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 right-4">
        <Button
          variant={measurementMode ? "default" : "secondary"}
          onClick={onMeasurementToggle}
          data-testid="button-measurement-mode"
        >
          <Ruler className="h-4 w-4 mr-2" />
          Measurement Mode
        </Button>
      </div>

      {modelLoaded && (
        <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground bg-card/80 backdrop-blur px-3 py-2 rounded">
          <div>X: 0.00 Y: 2.00 Z: 0.00</div>
        </div>
      )}
    </div>
  );
}
