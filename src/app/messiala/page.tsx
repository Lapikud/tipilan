"use client";

import { vipnagorgialla } from "@/components/Vipnagorgialla";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

export default function Expo() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0f19);

    // Isometric camera setup
    const aspect = 800 / 600;
    const frustumSize = 14;
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
    renderer.setSize(800, 600);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

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
      0xff6b35, // Orange - Mänguklubi
      0x4ecdc4, // Turquoise - Baariala
      0xffe66d, // Yellow - EVAL
      0xe74c3c, // Red - Redbull
      0x9b59b6, // Purple - Võitlusmängu ala
      0x3498db, // Blue - Sony
      0x2ecc71, // Green - Chillimisala
    ];

    const roomNames = [
      "Mänguklubi",
      "Baariala",
      "EVAL",
      "Redbull",
      "Võitlusmängu ala",
      "Sony",
      "Chillimisala",
    ];

    // Create individual rooms as rectangles with custom positions
    const rooms: THREE.Mesh[] = [];
    const roomData: Array<{
      mesh: THREE.Mesh;
      name: string;
      originalColor: number;
      originalScale: THREE.Vector3;
    }> = [];

    // Define rooms with custom positions, sizes and colors
    const roomDefinitions = [
      {
        width: 7,
        height: 0.7,
        depth: 3,
        x: 2.5,
        z: 4,
        color: roomColors[0],
        name: roomNames[0],
      }, // Mänguklubi
      // {
      //  width: 2.5,
      //  height: 0.7,
      //  depth: 0.7,
      //  x: 1,
      //  z: 0,
      //  color: roomColors[1],
      //  name: roomNames[1],
      // }, // Baariala
      {
        width: 1.8,
        height: 0.7,
        depth: 1.5,
        x: 2.5,
        z: -3.5,
        color: roomColors[2],
        name: roomNames[2],
      }, // EVAL
      {
        width: 2,
        height: 0.7,
        depth: 4,
        x: 5,
        z: -1.7,
        color: roomColors[3],
        name: roomNames[3],
      }, // Redbull
      {
        width: 3,
        height: 0.7,
        depth: 1.3,
        x: 0,
        z: -3.5,
        color: roomColors[4],
        name: roomNames[4],
      }, // Võitlusmängu ala
      {
        width: 1.8,
        height: 0.7,
        depth: 1.5,
        x: -2.55,
        z: -3.5,
        color: roomColors[5],
        name: roomNames[5],
      }, // Sony
      {
        width: 4,
        height: 0.7,
        depth: 4,
        x: -5.5,
        z: -2.3,
        color: roomColors[6],
        name: roomNames[6],
      }, // Chillimisala
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
    const groundMaterial2 = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    const ground2 = new THREE.Mesh(groundGeometry2, groundMaterial2);
    ground2.rotation.x = -Math.PI / 2;
    ground2.position.x = -12.2;
    ground2.position.y = -5;
    ground2.receiveShadow = true;
    scene.add(ground2);

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

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-[90vh] p-12 pt-18">
      <h1
        className={`text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}
      >
        Messiala
      </h1>
      <div className="mb-6">
        <h2 className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5] mb-3">
          Tudengimaja
        </h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 border border-gray-300"
              style={{ backgroundColor: "#ff6b35" }}
            ></div>
            <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
              Mänguklubi
            </span>
          </div>
          <div className="items-center gap-2 hidden">
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
              style={{ backgroundColor: "#e74c3c" }}
            ></div>
            <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
              Redbull
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 border border-gray-300"
              style={{ backgroundColor: "#9b59b6" }}
            ></div>
            <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
              Võitlusmängu ala
            </span>
          </div>
          <div className="flex items-center gap-2">
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
              style={{ backgroundColor: "#2ecc71" }}
            ></div>
            <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
              Chillimisala
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-shrink-0 border-3 border-[#1F5673]">
          <div ref={mountRef} />
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
  );
}
