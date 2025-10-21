"use client";

import { vipnagorgialla } from "@/components/Vipnagorgialla";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect, useRef, useState, useMemo } from "react";
import { EyeClosed, Eye } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import { useTranslations } from "next-intl";
import {
  roomNameKeys,
  staticRoomNames,
  roomMeta,
  RoomNameKey,
} from "@/data/roomNames";

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

  // Room names using translations and staticRoomNames
  const roomNames = useMemo(() => {
    const names: Record<RoomNameKey, string> = {} as never;
    roomNameKeys.forEach((key) => {
      if (staticRoomNames[key]) {
        names[key] = staticRoomNames[key]!;
      } else {
        // fallback to translation key or just key
        names[key] = t(`expo.areas.${key}`, { default: key });
      }
    });
    return names;
  }, [t]);

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

    // Create individual rooms as rectangles with custom positions using roomMeta
    const rooms: THREE.Mesh[] = [];
    const roomData: Array<{
      mesh: THREE.Mesh;
      name: string;
      originalColor: number;
      originalScale: THREE.Vector3;
      view: "tudengimaja" | "fuajee";
    }> = [];
    const dividers: THREE.Mesh[] = [];

    // Generate rooms for tudengimaja and fuajee using roomMeta
    roomNameKeys.forEach((key) => {
      const metas = roomMeta[key];
      if (!metas) return;
      metas.forEach((meta) => {
        if (meta.view !== "tudengimaja") return;
        const geometry = new THREE.BoxGeometry(
          meta.size.width,
          meta.size.height,
          meta.size.depth,
        );
        const material = new THREE.MeshLambertMaterial({
          color: meta.color,
        });
        const room = new THREE.Mesh(geometry, material);
        room.position.set(meta.position.x, meta.position.y, meta.position.z);
        room.castShadow = true;
        room.receiveShadow = true;
        room.userData = { name: roomNames[key], originalColor: meta.color };

        scene.add(room);
        rooms.push(room);

        roomData.push({
          mesh: room,
          name: roomNames[key],
          originalColor: meta.color,
          originalScale: room.scale.clone(),
          view: "tudengimaja",
        });
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
        color: 0x2e5570,
        // transparent: true,
        // opacity: 0,
      });

      const wall = new THREE.Mesh(wallGeometry, wallMaterial);
      wall.position.set(x, height / 2, z);
      wall.visible = false;
      scene.add(wall);
      dividers.push(wall);
    };

    // Add strategic dividers between major areas
    createTogglableDivider(2, 2, 1, -6.5, 1); // Wall behind photowall
    createTogglableDivider(4, 2, 2, -3.5, 1.5); // Wall between main entrance
    createTogglableDivider(2, 2, 1, -0.5, 1.5); // Wall behind bar
    createTogglableDivider(2, 2, 2, 1.5, 1.5); // Wall between main entrance

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
    const ground2 = new THREE.Mesh(groundGeometry2, groundMaterial);
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

    // Function to create rooms for fuajee using roomMeta
    const createfuajeeRooms = () => {
      roomNameKeys.forEach((key) => {
        const metas = roomMeta[key];
        if (!metas) return;
        metas.forEach((meta) => {
          if (meta.view !== "fuajee") return;
          const geometry = new THREE.BoxGeometry(
            meta.size.width,
            meta.size.height,
            meta.size.depth,
          );
          const material = new THREE.MeshLambertMaterial({
            color: meta.color,
          });

          const room = new THREE.Mesh(geometry, material);
          room.position.set(meta.position.x, meta.position.y, meta.position.z);
          room.castShadow = true;
          room.receiveShadow = true;
          room.userData = { name: roomNames[key], originalColor: meta.color };
          room.visible = true; // Initially visible for fuajee default

          scene.add(room);
          fuajeeRooms.push(room);

          roomData.push({
            mesh: room,
            name: roomNames[key],
            originalColor: meta.color,
            originalScale: room.scale.clone(),
            view: "fuajee",
          });
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
              {/* Bar */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#4ecdc4" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.bar")}
                </span>
              </div>
              {/* EVAL */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#4d86f7" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  EVAL
                </span>
              </div>
              {/* Board Games */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#343434" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.boardGames")}
                </span>
              </div>
              {/* LVLup */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#d34e35" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  LVLup!
                </span>
              </div>
              {/* Red Bull */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#c02841" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  Red Bull
                </span>
              </div>
              {/* Sim Racing */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#d8b43c" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.simRacing")}
                </span>
              </div>
              {/* Fighting */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#a8f494" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.fighting")}
                </span>
              </div>
              {/* K-space */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#2c5da3" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  K-space.ee
                </span>
              </div>
              {/* Photowall */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#d12e7d" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.photowall")}
                </span>
              </div>
              {/* Buckshot Roulette */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#edb4b1" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  Buckshot Roulette
                </span>
              </div>
              {/* Chill Area */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#05512e" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  {t("expo.areas.chillArea")}
                </span>
              </div>
              {/* Alzgamer */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#d08331" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  Alzgamer
                </span>
              </div>
              {/* WC */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: "#332b5d" }}
                ></div>
                <span className="text-sm text-[#2A2C3F] dark:text-[#EEE5E5]">
                  WC
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
                  {t("expo.areas.studentformula")}
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
                roomNames.kspace,
                roomNames.photowall,
                roomNames.buckshotroulette,
                roomNames.wc,
                roomNames.chillArea,
                roomNames.alzgamer,
              ].includes(hoveredRoom)) ||
              (currentView === "fuajee" &&
                [
                  roomNames.tartuyk,
                  roomNames.estoniagamedev,
                  roomNames.info,
                  roomNames.tly,
                  roomNames.ittk,
                  roomNames.gameup,
                  roomNames.studentformula,
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
    </div>
  );
}
