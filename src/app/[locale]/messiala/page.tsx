"use client";

import { vipnagorgialla } from "@/components/Vipnagorgialla";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect, useRef, useState, useMemo } from "react";
import { EyeClosed, Eye } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import { useTranslations } from "next-intl";

// Define interface for the ref with toggle function
interface MountRefCurrent extends HTMLDivElement {
  toggleDividers?: (show: boolean) => void;
  switchView?: (view: "tudengimaja" | "fuajee") => void;
}

export default function Expo() {
  const mountRef = useRef<MountRefCurrent | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDividers, setShowDividers] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<"tudengimaja" | "fuajee">(
    "fuajee",
  );
  const currentViewRef = useRef<"tudengimaja" | "fuajee">("fuajee");
  const t = useTranslations();

  // Define room names with translations
  const roomNames = useMemo(
    () => ({
      boardGames: t("expo.areas.boardGames"),
      bar: t("expo.areas.bar"),
      eval: "EVAL",
      simRacing: t("expo.areas.simRacing"),
      fighting: t("expo.areas.fighting"),
      lvlup: "LVLup!",
      redbull: "Red Bull",
      // fuajee rooms
      estoniagamedev: t("expo.areas.estoniagamedev"),
      info: t("expo.areas.info"),
      tartuyk: t("expo.areas.tartuyk"),
      tly: t("expo.areas.tly"),
      gameup: "GameUP!",
      ittk: t("expo.areas.ittk"),
      photobooth: t("expo.areas.photobooth"),
    }),
    [t],
  );

  useEffect(() => {
    if (!mountRef.current) return;

    // Copy ref to variable to avoid stale closure in cleanup
    const mountElement = mountRef.current;
    let dividersRef: THREE.Mesh[] = [];
    const fuajeeMeshes: THREE.Mesh[] = [];
    let tudengimajaObjects: THREE.Object3D[] = [];
    let fuajeeMesh: THREE.Group | null = null;
    const fuajeeRooms: THREE.Mesh[] = [];

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
    const frustumSize = baseFrustumSize; // Keep consistent frustum size
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000,
    );

    // Camera positions for different views
    const cameraPositions = {
      tudengimaja: {
        position: new THREE.Vector3(10, 10, 14),
        lookAt: new THREE.Vector3(-1.4, 0, 0),
      },
      fuajee: {
        position: new THREE.Vector3(30, 20, 15),
        lookAt: new THREE.Vector3(0, 0, 0),
      },
    };

    // Position camera for isometric view (default to fuajee)
    camera.position.copy(cameraPositions.fuajee.position);
    camera.lookAt(cameraPositions.fuajee.lookAt);

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
      view: "tudengimaja" | "fuajee";
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
        name: roomNames.boardGames,
      },
      {
        width: 3.5,
        height: 0.7,
        depth: 1.2,
        x: 0.7,
        z: -0.3,
        color: roomColors[1],
        name: roomNames.bar,
      },
      {
        width: 1.8,
        height: 0.7,
        depth: 1.5,
        x: 1,
        z: -3.5,
        color: roomColors[2],
        name: roomNames.eval,
      },
      {
        width: 2,
        height: 0.7,
        depth: 4.5,
        x: 5.2,
        z: -2,
        color: roomColors[3],
        name: roomNames.simRacing,
      },
      {
        width: 3,
        height: 0.7,
        depth: 1.5,
        x: -1.7,
        z: -3.5,
        color: roomColors[4],
        name: roomNames.fighting,
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
        name: roomNames.lvlup,
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
        name: roomNames.redbull,
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
        view: "tudengimaja",
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

    // Store tudengimaja objects (rooms, ground, dividers)
    tudengimajaObjects = [...rooms, ground, ground2, ...dividers];

    // Set initial visibility for fuajee default view
    tudengimajaObjects.forEach((obj) => (obj.visible = false));

    // Load fuajee GLTF model
    const loader = new GLTFLoader();
    loader.load(
      "/spaces/fuajeeTalTech.glb",
      (gltf) => {
        fuajeeMesh = gltf.scene;
        fuajeeMesh.position.set(-1.5, 1, 0);
        fuajeeMesh.scale.set(0.3, 0.3, 0.3);
        fuajeeMesh.visible = true; // Initially visible for fuajee default

        // Traverse the model to collect meshes
        fuajeeMesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            fuajeeMeshes.push(child);
          }
        });

        scene.add(fuajeeMesh);

        // Create example rooms for fuajee after the model loads
        createfuajeeRooms();

        // Set initial visibility for fuajee view
        tudengimajaObjects.forEach((obj) => (obj.visible = false));
        fuajeeMesh.visible = true;
        fuajeeRooms.forEach((room) => (room.visible = true));
      },
      (progress) => {
        console.log(
          "Loading progress:",
          (progress.loaded / progress.total) * 100 + "%",
        );
      },
      (error) => {
        console.error("Error loading GLTF:", error);
      },
    );

    // Function to create example rooms for fuajee
    const createfuajeeRooms = () => {
      const fuajeeRoomColors = [
        0x7b1642, // ITÜK - Cherry Red
        0x365591, // Light Blue - Tartu Ülikool
        0xa82838, // Red - Tallinna Ülikool
        0x183bbf, // Dark Blue - Eesti Gamedev
        0xd12e7d, // Purple - Taltech
        0x228b22, // Green - GameUP
        0xff6347, // Orange - Info
        0x20b2aa, // Light Sea Green - Photobooth
      ];

      const fuajeeRoomDefinitions = [
        {
          width: 5,
          height: 0.5,
          depth: 3.5,
          x: -6,
          z: 2.8,
          color: fuajeeRoomColors[4],
          name: roomNames.ittk,
        },
        {
          width: 5,
          height: 0.5,
          depth: 2,
          x: 2.2,
          z: -1.5,
          color: fuajeeRoomColors[1],
          name: roomNames.tartuyk,
        },
        {
          width: 6,
          height: 0.5,
          depth: 2,
          x: -5.8,
          z: -1.2,
          color: fuajeeRoomColors[3],
          name: roomNames.estoniagamedev,
        },
        {
          width: 2,
          height: 0.5,
          depth: 2,
          x: -1.5,
          z: -1.5,
          color: fuajeeRoomColors[6],
          name: roomNames.info,
        },
        {
          width: 2,
          height: 0.5,
          depth: 1.5,
          x: 6,
          z: -1.7,
          color: fuajeeRoomColors[2],
          name: roomNames.tly,
        },
        {
          width: 2,
          height: 0.5,
          depth: 1.5,
          x: 11,
          z: -1.7,
          color: fuajeeRoomColors[4],
          name: roomNames.ittk,
        },
        {
          width: 2,
          height: 0.5,
          depth: 1.5,
          x: 13.5,
          z: -1.7,
          color: fuajeeRoomColors[7],
          name: roomNames.photobooth,
        },
        {
          width: 2,
          height: 0.5,
          depth: 1.5,
          x: 8.5,
          z: -1.7,
          color: fuajeeRoomColors[5],
          name: roomNames.gameup,
        },
      ];

      fuajeeRoomDefinitions.forEach((roomDef) => {
        const geometry = new THREE.BoxGeometry(
          roomDef.width,
          roomDef.height,
          roomDef.depth,
        );
        const material = new THREE.MeshLambertMaterial({
          color: roomDef.color,
        });

        const room = new THREE.Mesh(geometry, material);
        room.position.set(roomDef.x, roomDef.height / 2 + 2, roomDef.z);
        room.castShadow = true;
        room.receiveShadow = true;
        room.userData = { name: roomDef.name, originalColor: roomDef.color };
        room.visible = true; // Initially visible for fuajee default

        scene.add(room);
        fuajeeRooms.push(room);
        roomData.push({
          mesh: room,
          name: roomDef.name,
          originalColor: roomDef.color,
          originalScale: room.scale.clone(),
          view: "fuajee",
        });
      });
    };

    // Resize handler
    const handleResize = () => {
      const { width: newWidth, height: newHeight } = getResponsiveDimensions();

      // Update camera
      const newAspect = newWidth / newHeight;
      const newFrustumSize = baseFrustumSize;

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

      // Handle mouse interactions based on current view
      if (currentViewRef.current === "tudengimaja") {
        // Update raycaster
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(rooms);

        // Reset all tudengimaja rooms to original state
        roomData
          .filter((r) => r.view === "tudengimaja")
          .forEach(({ mesh, originalColor, originalScale }) => {
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
      } else if (currentViewRef.current === "fuajee") {
        // Update raycaster for fuajee rooms
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(fuajeeRooms);

        // Reset all fuajee rooms to original state
        roomData
          .filter((r) => r.view === "fuajee")
          .forEach(({ mesh, originalColor, originalScale }) => {
            (mesh.material as THREE.MeshLambertMaterial).color.setHex(
              originalColor,
            );

            mesh.scale.copy(originalScale);
          });

        if (intersects.length > 0) {
          const hoveredMesh = intersects[0].object as THREE.Mesh;
          const roomInfo = roomData.find((r) => r.mesh === hoveredMesh);

          if (roomInfo) {
            // Apply hover effects with better visibility
            (hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(
              0xffffff,
            );

            hoveredMesh.scale.multiplyScalar(1.1);
            setHoveredRoom(roomInfo.name);
          }
        } else {
          setHoveredRoom(null);
        }
      } else {
        setHoveredRoom(null);
      }
    };

    // Add mouse event listener
    renderer.domElement.addEventListener("mousemove", onMouseMove);

    // Function to switch camera views
    const switchView = (view: "tudengimaja" | "fuajee") => {
      const targetPosition = cameraPositions[view].position;
      const targetLookAt = cameraPositions[view].lookAt;

      // Animate camera transition
      const startPosition = camera.position.clone();
      const startLookAt = new THREE.Vector3();
      camera.getWorldDirection(startLookAt);
      startLookAt.multiplyScalar(-1).add(camera.position);

      let progress = 0;
      const animateCamera = () => {
        progress += 0.05;
        if (progress >= 1) {
          progress = 1;
        }

        // Smooth interpolation
        const easeProgress = 1 - Math.cos(progress * Math.PI * 0.5);

        camera.position.lerpVectors(
          startPosition,
          targetPosition,
          easeProgress,
        );
        const currentLookAt = new THREE.Vector3().lerpVectors(
          startLookAt,
          targetLookAt,
          easeProgress,
        );
        camera.lookAt(currentLookAt);

        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        }
      };

      animateCamera();

      // Reset hover state when switching views
      setHoveredRoom(null);

      // Reset all room states to original
      roomData.forEach(({ mesh, originalColor, originalScale }) => {
        (mesh.material as THREE.MeshLambertMaterial).color.setHex(
          originalColor,
        );
        mesh.scale.copy(originalScale);
      });

      // Toggle visibility of objects based on view
      if (view === "fuajee") {
        tudengimajaObjects.forEach((obj) => (obj.visible = false));
        if (fuajeeMesh) {
          fuajeeMesh.visible = true;
        }
        fuajeeRooms.forEach((room) => (room.visible = true));
      } else {
        tudengimajaObjects.forEach((obj) => (obj.visible = true));
        if (fuajeeMesh) {
          fuajeeMesh.visible = false;
        }
        fuajeeRooms.forEach((room) => (room.visible = false));
        // Re-apply divider visibility state
        if (mountElement.toggleDividers) {
          mountElement.toggleDividers(showDividers);
        }
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Gentle floating animation for rooms
      if (currentViewRef.current === "tudengimaja") {
        rooms.forEach((room, index) => {
          const originalY = 0.25; // height / 2 for the room height of 0.5
          const baseY = originalY + Math.sin(Date.now() * 0.001 + index) * 0.05;

          // Maintain current scale while updating Y position
          room.position.y = baseY;
        });
      } else if (currentViewRef.current === "fuajee") {
        fuajeeRooms.forEach((room, index) => {
          const originalY = 2.25; // height / 2 for the room height of 0.5 + 2 offset
          const baseY = originalY + Math.sin(Date.now() * 0.001 + index) * 0.05;

          // Maintain current scale while updating Y position
          room.position.y = baseY;
        });
      }

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

    // Expose functions to parent scope
    mountElement.toggleDividers = toggleDividers;
    mountElement.switchView = switchView;

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [roomNames]);

  // Update dividers when showDividers state changes
  useEffect(() => {
    if (mountRef.current?.toggleDividers) {
      mountRef.current.toggleDividers(showDividers);
    }
  }, [showDividers]);

  // Handle view switching
  const handleViewSwitch = (view: "tudengimaja" | "fuajee") => {
    setCurrentView(view);
    currentViewRef.current = view; // Update ref immediately
    setHoveredRoom(null); // Clear any existing hover state
    if (mountRef.current?.switchView) {
      mountRef.current.switchView(view);
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16 ">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 md:mt-16 mb-4 uppercase`}
        >
          {t("expo.title")}
        </h1>
        <div className="mb-6">
          <h2 className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5] mb-3">
            {currentView === "tudengimaja"
              ? t("schedule.locations.studentHouse")
              : t("schedule.locations.entranceHall")}
          </h2>

          {currentView === "tudengimaja" && (
            <div className="flex flex-wrap gap-4 pb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#4ecdc4" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.bar")}
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
                  {t("expo.areas.boardGames")}
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
                  {t("expo.areas.simRacing")}
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
                  {t("expo.areas.fighting")}
                </span>
              </div>
            </div>
          )}

          {currentView === "fuajee" && (
            <div className="flex flex-wrap gap-4 pb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#183bbf" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.estoniagamedev")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#228b22" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.gameup")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#ff6347" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.info")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#d12e7d" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.ittk")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#20b2aa" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.photobooth")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#365591" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.tartuyk")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#a82838" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.tly")}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="relative w-full max-w-[800px]">
              <div className="flex-shrink-0 border-3 border-[#1F5673] w-full relative">
                <div ref={mountRef} className="w-full" />
                {/* Left Arrow - Only show when on fuajee to go back to tudengimaja */}
                {currentView === "fuajee" && (
                  <button
                    onClick={() => handleViewSwitch("tudengimaja")}
                    className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-[#1F5673] text-white hover:bg-[#2A7A9B] ${vipnagorgialla.className} uppercase italic text-sm font-semibold flex items-center transition-colors shadow-lg z-10 cursor-pointer`}
                    title="Switch to Tudengimaja"
                    aria-label="Switch to Tudengimaja view"
                  >
                    <span className="material-symbols-outlined !text-2xl !font-bold text-white mr-2 transform rotate-180">
                      arrow_right_alt
                    </span>
                    {t("schedule.locations.studentHouse")}
                  </button>
                )}

                {/* Right Arrow - Only show when on tudengimaja to go to fuajee */}
                {currentView === "tudengimaja" && (
                  <button
                    onClick={() => handleViewSwitch("fuajee")}
                    className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-[#1F5673] text-white hover:bg-[#2A7A9B] ${vipnagorgialla.className} uppercase italic text-sm font-semibold flex items-center transition-colors shadow-lg z-10 cursor-pointer`}
                    title="Switch to Fuajee"
                    aria-label="Switch to Fuajee view"
                  >
                    {t("schedule.locations.entranceHall")}
                    <span className="material-symbols-outlined !text-2xl !font-bold text-white ml-2">
                      arrow_right_alt
                    </span>
                  </button>
                )}

                {currentView === "tudengimaja" && (
                  <button
                    onClick={() => setShowDividers(!showDividers)}
                    className={`absolute top-2 right-2 px-3 py-2 bg-[#1F5673] text-white hover:bg-[#2A7A9B] ${vipnagorgialla.className} uppercase italic text-sm font-semibold flex items-center transition-colors shadow-lg z-10 cursor-pointer`}
                  >
                    {showDividers ? (
                      <EyeClosed className="w-6 h-6 mr-2" />
                    ) : (
                      <Eye className="w-6 h-6 mr-2" />
                    )}

                    {showDividers ? t("expo.hide") : t("expo.show")}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tooltip - only show for current view */}
          {hoveredRoom &&
            ((currentView === "tudengimaja" &&
              [
                roomNames.boardGames,
                roomNames.bar,
                roomNames.eval,
                roomNames.simRacing,
                roomNames.fighting,
                roomNames.lvlup,
                roomNames.redbull,
              ].includes(hoveredRoom)) ||
              (currentView === "fuajee" &&
                [
                  roomNames.tartuyk,
                  roomNames.estoniagamedev,
                  roomNames.info,
                  roomNames.tly,
                  roomNames.ittk,
                  roomNames.photobooth,
                  roomNames.gameup,
                ].includes(hoveredRoom))) && (
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

      {/* MINITURNIIRID Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8 m-6 md:m-16 mb-16">
        <div className="flex-1">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5] mb-6 uppercase`}
          >
            MINITURNIIRID
          </h2>
          <p className="text-[#2A2C3F] dark:text-[#EEE5E5] text-lg mb-4">
            TipiLANil toimub mitmeid erinevaid lõbusaid ja võistlushimu tekitavaid miniturniire. Osaleda saavad ka niisama külastajad! Auhinnafond on kõigi turniiride peale 1250€.
          </p>
        </div>
        <div className="flex-shrink-0 relative overflow-hidden">
          <img
            src="/images/minitournament_logo.png"
            alt="Miniturniirid logo"
            style={{
              width: '649.7214965820312px',
              height: '400.99997840027544px',
              transform: 'rotate(0deg)',
              opacity: 1,
              position: 'relative'
            }}
          />
        </div>
      </div>

      <SectionDivider />

      {/* PUHKA JA MÄNGI Section */}
      <div className="flex flex-col m-6 md:m-16 mb-16">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5] mb-8 uppercase`}
        >
          PUHKA JA MÄNGI
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Chill-ala */}
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden mb-4">
              <div className="relative h-48">
                <img
                  src="/images/EXPO/chill_ala.jpg"
                  alt="Chill-ala"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 
              className="text-[#2A2C3F] dark:text-[#EEE5E5]"
              style={{
                fontFamily: 'Work Sans',
                fontWeight: 700,
                fontSize: '36px',
                lineHeight: '100%',
                letterSpacing: '-3%',
                verticalAlign: 'middle'
              }}
            >
              Chill-ala koos turniiride otseülekandega
            </h3>
          </div>

          {/* Card 2 - Mänguklubi */}
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden mb-4">
              <div className="relative h-48">
                <img
                  src="/images/EXPO/mklubi.jpg"
                  alt="Mänguklubi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 
              className="text-[#2A2C3F] dark:text-[#EEE5E5]"
              style={{
                fontFamily: 'Work Sans',
                fontWeight: 700,
                fontSize: '36px',
                lineHeight: '100%',
                letterSpacing: '-3%',
                verticalAlign: 'middle'
              }}
            >
              Mänguklubi lauamängud ja konsoolid
            </h3>
          </div>

          {/* Card 3 - Baariala */}
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden mb-4">
              <div className="relative h-48">
                <img
                  src="/images/EXPO/baar.jpg"
                  alt="Baariala"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 
              className="text-[#2A2C3F] dark:text-[#EEE5E5]"
              style={{
                fontFamily: 'Work Sans',
                fontWeight: 700,
                fontSize: '36px',
                lineHeight: '100%',
                letterSpacing: '-3%',
                verticalAlign: 'middle'
              }}
            >
              Baariala jookide ja snäkkidega
            </h3>
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* EESTI MÄNGUARENDAJAD Section */}
      <div className="flex flex-col m-6 md:m-16 mb-16">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5] mb-8 uppercase`}
        >
          Eesti mänguarendajad
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {/* Row 1 - 4 items */}
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Lostbyte.png"
                alt="Broken Alliance"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Broken Alliance</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Eleball.png"
                alt="Eleball"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Eleball</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Placeholder Gameworks/craftcraft_simulator_logo.png"
                alt="CraftCraft Simulator"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">CraftCraft Simulator</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/HRA - CYBER DOC ROGUE/cyber_dog_rogue_logo.png"
                alt="Cyber Dog Rescue"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Cyber Dog Rescue</h3>
          </div>

          {/* Row 2 - 4 items */}
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Placeholder Gameworks/death_and_taxes_logo.png"
                alt="Death and Taxes"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Death and Taxes</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Path of Pixels/deep_pixel_melancholy_logo.png"
                alt="Deep Pixel Melancholy"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Deep Pixel Melancholy</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Cyber_Doc_Rogue.png"
                alt="Delusional"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Delusional</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Eleball.png"
                alt="Eleball"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Eleball</h3>
          </div>

          {/* Row 3 - 4 items */}
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Hardwired.png"
                alt="Hardwired"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Hardwired</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Hexwave.png"
                alt="HexWave"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">HexWave</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Immortal.png"
                alt="IMMORTAL: And the death that follows"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">IMMORTAL: And the death that follows</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Kalawindow.png"
                alt="Kalawindow"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Kalawindow</h3>
          </div>

          {/* Row 4 - 4 items */}
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Korter1996.png"
                alt="Kortel 1996"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Kortel 1996</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Midnight_Souveneirs.png"
                alt="Midnight Souveneirs"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Midnight Souveneirs</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Nullis.png"
                alt="Nullis"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Nullis</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Planet_hoarders.png"
                alt="Planet Hoarders"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Planet Hoarders</h3>
          </div>

          {/* Row 5 - 3 items (last row) */}
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Realm Hearts/realm_hearts.png"
                alt="Realm Hearts"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Realm Hearts</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/Seasons_of_Solitude.png"
                alt="Season of Solitude"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">Season of Solitude</h3>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden aspect-square mb-2">
              <img
                src="/images/EXPO/GameDev logos/War_torn.png"
                alt="War-thorn"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-[#2A2C3F] dark:text-[#EEE5E5] text-center font-semibold">War-thorn</h3>
          </div>
        </div>
      </div>

      <SectionDivider />
    </div>
  );
}
