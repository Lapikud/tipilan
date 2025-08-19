"use client";

import { vipnagorgialla } from "@/components/Vipnagorgialla";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { EyeClosed, Eye } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";

// Define interface for the ref with toggle function
interface MountRefCurrent extends HTMLDivElement {
  toggleDividers?: (show: boolean) => void;
}

export default function Expo() {
  const mountRef = useRef<MountRefCurrent | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDividers, setShowDividers] = useState<boolean>(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Copy ref to variable to avoid stale closure in cleanup
    const mountElement = mountRef.current;
    let dividersRef: THREE.Mesh[] = [];

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0f19);

    // Get responsive dimensions
    const getResponsiveDimensions = () => {
      const container = mountRef.current;
      if (!container) return { width: 800, height: 600 };

      const containerWidth = container.offsetWidth;
      const maxWidth = Math.min(containerWidth, 800);
      const width = Math.max(maxWidth, 300); // Minimum width
      const height = (width * 600) / 800; // Maintain aspect ratio

      return { width, height };
    };

    const { width, height } = getResponsiveDimensions();

    // Isometric camera setup with responsive sizing
    const aspect = width / height;
    const baseFrustumSize = 14;
    const frustumSize = width < 600 ? baseFrustumSize * 0.8 : baseFrustumSize; // Smaller frustum for mobile
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000,
    );

    // Position camera for isometric view
    camera.position.set(10, 10, 14);
    camera.lookAt(-1.4, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountElement.appendChild(renderer.domElement);

    // Raycaster for mouse interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = false;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Room colors and names
    const roomColors = [
      0x343434, // Gray - Lauamängude ala
      0x4ecdc4, // Turquoise - Baariala
      0xffe66d, // Yellow - EVAL
      0xff6600, // Orange - Redbull Sim Racing
      0xff1493, // Deep Pink - Võitlusmängu ala
      0x3498db, // Blue - Sony
      0x2ecc71, // Green - Lava
      0x080682, // Dark Blue - LVLup!
      0xc02841, // Red - RedBull
    ];

    // Create individual rooms as rectangles with custom positions
    const rooms: THREE.Mesh[] = [];
    const roomData: Array<{
      mesh: THREE.Mesh;
      name: string;
      originalColor: number;
      originalScale: THREE.Vector3;
    }> = [];
    const dividers: THREE.Mesh[] = [];

    // Define rooms with custom positions, sizes and colors
    const roomDefinitions = [
      {
        width: 7,
        height: 0.7,
        depth: 3,
        x: 2.5,
        z: 4,
        color: roomColors[0],
        name: "Lauamängude ala",
      },
      {
        width: 3.5,
        height: 0.7,
        depth: 1.2,
        x: 0.7,
        z: -0.3,
        color: roomColors[1],
        name: "Baariala",
      },
      {
        width: 1.8,
        height: 0.7,
        depth: 1.5,
        x: 1,
        z: -3.5,
        color: roomColors[2],
        name: "EVAL",
      },
      {
        width: 2,
        height: 0.7,
        depth: 4.5,
        x: 5.2,
        z: -2,
        color: roomColors[3],
        name: "Red Bull Sim Racing",
      },
      {
        width: 3,
        height: 0.7,
        depth: 1.5,
        x: -1.7,
        z: -3.5,
        color: roomColors[4],
        name: "Võitlusmängu ala",
      },
      // {
      //   width: 1.8,
      //   height: 0.7,
      //   depth: 1.5,
      //   x: -4.3,
      //   z: -3.5,
      //   color: roomColors[5],
      //   name: "Sony",
      // },
      {
        width: 3,
        height: 0.7,
        depth: 1.7,
        x: -3.5,
        z: -0.5,
        color: roomColors[7],
        name: "LVLup!",
      },
      //{
      //  width: 2,
      //  height: 0.7,
      //  depth: 4,
      //  x: -6.4,
      //  z: -2.3,
      //  color: roomColors[6],
      //  name: "Lava",
      //},
      {
        width: 1.8,
        height: 0.7,
        depth: 1.5,
        x: 3,
        z: -3.5,
        color: roomColors[8],
        name: "Red Bull",
      },
    ];

    roomDefinitions.forEach((roomDef) => {
      const geometry = new THREE.BoxGeometry(
        roomDef.width,
        roomDef.height,
        roomDef.depth,
      );
      const material = new THREE.MeshLambertMaterial({
        color: roomDef.color,
      });

      const room = new THREE.Mesh(geometry, material);
      room.position.set(roomDef.x, roomDef.height / 2, roomDef.z);
      room.castShadow = true;
      room.receiveShadow = true;
      room.userData = { name: roomDef.name, originalColor: roomDef.color };

      scene.add(room);
      rooms.push(room);
      roomData.push({
        mesh: room,
        name: roomDef.name,
        originalColor: roomDef.color,
        originalScale: room.scale.clone(),
      });
    });

    // Create toggleable room dividers
    const createTogglableDivider = (
      width: number,
      height: number,
      depth: number,
      x: number,
      z: number,
    ) => {
      const wallGeometry = new THREE.BoxGeometry(width, height, depth);
      const wallMaterial = new THREE.MeshLambertMaterial({
        color: 0x555555,
        transparent: true,
        opacity: 0,
      });

      const wall = new THREE.Mesh(wallGeometry, wallMaterial);
      wall.position.set(x, height / 2, z);
      wall.visible = false;
      scene.add(wall);
      dividers.push(wall);
    };

    // Add strategic dividers between major areas
    createTogglableDivider(10, 2, 2, -2.5, 1.5); // Wall between main entrance
    createTogglableDivider(2, 2, 2, 5.5, 1.5); // Wall right next to Lauamängud & Redbull Sim Racing

    // Store dividers reference for later access
    dividersRef = [...dividers];

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(14, 10.5);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.x = -1.1;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Second ground plane
    const groundGeometry2 = new THREE.PlaneGeometry(2, 7);
    const groundMaterial2 = new THREE.MeshLambertMaterial({
      color: 0xcccccc,
    });
    const ground2 = new THREE.Mesh(groundGeometry2, groundMaterial2);
    ground2.rotation.x = -Math.PI / 2;
    ground2.position.x = -12.2;
    ground2.position.y = -5;
    ground2.receiveShadow = true;
    scene.add(ground2);

    // Resize handler
    const handleResize = () => {
      const { width: newWidth, height: newHeight } = getResponsiveDimensions();

      // Update camera
      const newAspect = newWidth / newHeight;
      const newFrustumSize =
        newWidth < 600 ? baseFrustumSize * 0.8 : baseFrustumSize;

      camera.left = (newFrustumSize * newAspect) / -2;
      camera.right = (newFrustumSize * newAspect) / 2;
      camera.top = newFrustumSize / 2;
      camera.bottom = newFrustumSize / -2;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(newWidth, newHeight);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Mouse event handlers
    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update mouse position for tooltip
      setMousePosition({ x: event.clientX, y: event.clientY });

      // Update raycaster
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(rooms);

      // Reset all rooms to original state
      roomData.forEach(({ mesh, originalColor, originalScale }) => {
        (mesh.material as THREE.MeshLambertMaterial).color.setHex(
          originalColor,
        );
        mesh.scale.copy(originalScale);
      });

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        const roomInfo = roomData.find((r) => r.mesh === hoveredMesh);

        if (roomInfo) {
          // Apply hover effects
          (hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(
            0xffffff,
          );
          hoveredMesh.scale.multiplyScalar(1.02);
          setHoveredRoom(roomInfo.name);
        }
      } else {
        setHoveredRoom(null);
      }
    };

    // Add mouse event listener
    renderer.domElement.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Gentle floating animation for rooms
      rooms.forEach((room, index) => {
        const originalY = 0.25; // height / 2 for the room height of 0.5
        const baseY = originalY + Math.sin(Date.now() * 0.001 + index) * 0.05;

        // Maintain current scale while updating Y position
        room.position.y = baseY;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Function to toggle dividers
    const toggleDividers = (show: boolean) => {
      dividersRef.forEach((divider) => {
        divider.visible = show;
        (divider.material as THREE.MeshLambertMaterial).opacity = show
          ? 0.4
          : 0;
      });
    };

    // Expose toggle function to parent scope
    mountElement.toggleDividers = toggleDividers;

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update dividers when showDividers state changes
  useEffect(() => {
    if (mountRef.current?.toggleDividers) {
      mountRef.current.toggleDividers(showDividers);
    }
  }, [showDividers]);

  return (
      <div> 
        <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16 ">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 md:mt-16 mb-4 uppercase`}
          >
            Messiala
          </h1>
          <div className="mb-6">
            <h2 className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5] mb-3">
              Tudengimaja
            </h2>
            <div className="flex flex-wrap gap-4 pb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#4ecdc4" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  Baariala
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#ffe66d" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  EVAL
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#343434" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  Lauamängude ala
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#080682" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  LVLup!
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#C02841" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  Red Bull
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#ff6600" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  Red Bull Sim Racing
                </span>
              </div>
              <div className="items-center gap-2 hidden">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#3498db" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  Sony
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#ff1493" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  Võitlusmängu ala
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-shrink-0 border-3 border-[#1F5673] w-full max-w-[800px] relative">
                <div ref={mountRef} className="w-full" />
                <button
                  onClick={() => setShowDividers(!showDividers)}
                  className={`absolute top-2 right-2 px-3 py-2 bg-[#1F5673] text-white hover:bg-[#2A7A9B] ${vipnagorgialla.className} uppercase italic text-sm font-semibold flex items-center transition-colors shadow-lg z-10`}
                >
                  {showDividers ? (
                    <EyeClosed className="w-6 h-6 mr-2" />
                  ) : (
                    <Eye className="w-6 h-6 mr-2" />
                  )}
    
                  {showDividers ? "Peida" : "Näita"}
                </button>
              </div>
            </div>
    
            {/* Tooltip */}
            {hoveredRoom && (
              <div
                className="fixed bg-black bg-opacity-80 text-white px-3 py-2 rounded-lg text-sm pointer-events-none z-50"
                style={{
                  left: mousePosition.x + 10,
                  top: mousePosition.y - 10,
                }}
              >
                {hoveredRoom}
              </div>
            )}
          </div>
        </div>
          
      <SectionDivider />
    </div>
  );
}
