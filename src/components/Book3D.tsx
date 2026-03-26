import { Component, Suspense, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { BookOpen } from "lucide-react";

interface Book3DProps {
	coverUrl: string | null;
	title: string;
}

const BOOK_WIDTH = 2;
const BOOK_HEIGHT = 2.8;
const BOOK_DEPTH = 0.3;

const SPINE_COLOR = "#3a2a1a";
const PAGE_COLOR = "#f5f0e8";
const BLANK_COVER_COLOR = "#8b7355";

function BookMeshWithTexture({ coverUrl }: { coverUrl: string }) {
	const meshRef = useRef<THREE.Mesh>(null);
	const groupRef = useRef<THREE.Group>(null);
	const [hovered, setHovered] = useState(false);

	const texture = useLoader(THREE.TextureLoader, coverUrl);

	useFrame((state) => {
		if (!meshRef.current || !groupRef.current) return;

		// smooth rotation
		const targetY = hovered ? 0.6 : 0.2;
		meshRef.current.rotation.y = THREE.MathUtils.lerp(
			meshRef.current.rotation.y,
			targetY,
			0.05,
		);

		// subtle float
		groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;

		// slight tilt
		const targetX = hovered ? 0.05 : 0.1;
		meshRef.current.rotation.x = THREE.MathUtils.lerp(
			meshRef.current.rotation.x,
			targetX,
			0.05,
		);
	});

	const materials = [
		new THREE.MeshStandardMaterial({ color: PAGE_COLOR, roughness: 0.9 }),
		new THREE.MeshStandardMaterial({ color: SPINE_COLOR, roughness: 0.6 }),
		new THREE.MeshStandardMaterial({ color: SPINE_COLOR, roughness: 0.6 }),
		new THREE.MeshStandardMaterial({ color: SPINE_COLOR, roughness: 0.6 }),
		new THREE.MeshStandardMaterial({
			map: texture,
			roughness: 0.4,
			metalness: 0.1,
		}),
		new THREE.MeshStandardMaterial({ color: SPINE_COLOR, roughness: 0.6 }),
	];

	return (
		<group ref={groupRef}>
			<mesh
				ref={meshRef}
				rotation={[0.1, -0.3, 0]}
				material={materials}
				castShadow
				receiveShadow
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
			>
				<boxGeometry args={[BOOK_WIDTH, BOOK_HEIGHT, BOOK_DEPTH]} />
			</mesh>
		</group>
	);
}

function BookMeshPlain() {
	const meshRef = useRef<THREE.Mesh>(null);
	const groupRef = useRef<THREE.Group>(null);
	const [hovered, setHovered] = useState(false);

	useFrame((state) => {
		if (!meshRef.current || !groupRef.current) return;

		const targetY = hovered ? 0.6 : 0.2;
		meshRef.current.rotation.y = THREE.MathUtils.lerp(
			meshRef.current.rotation.y,
			targetY,
			0.05,
		);

		groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
	});

	const materials = [
		new THREE.MeshStandardMaterial({ color: PAGE_COLOR, roughness: 0.9 }),
		new THREE.MeshStandardMaterial({ color: SPINE_COLOR, roughness: 0.6 }),
		new THREE.MeshStandardMaterial({ color: SPINE_COLOR, roughness: 0.6 }),
		new THREE.MeshStandardMaterial({ color: SPINE_COLOR, roughness: 0.6 }),
		new THREE.MeshStandardMaterial({
			color: BLANK_COVER_COLOR,
			roughness: 0.5,
		}),
		new THREE.MeshStandardMaterial({ color: SPINE_COLOR, roughness: 0.6 }),
	];

	return (
		<group ref={groupRef}>
			<mesh
				ref={meshRef}
				rotation={[0.1, -0.3, 0]}
				material={materials}
				castShadow
				receiveShadow
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
			>
				<boxGeometry args={[BOOK_WIDTH, BOOK_HEIGHT, BOOK_DEPTH]} />
			</mesh>
		</group>
	);
}

function FallbackCover({
	coverUrl,
	title,
}: {
	coverUrl: string | null;
	title: string;
}) {
	return (
		<div className="flex aspect-square w-full items-center justify-center rounded-xl bg-muted">
			{coverUrl ? (
				<img
					src={coverUrl}
					alt={title}
					className="size-full rounded-xl object-cover"
				/>
			) : (
				<BookOpen className="size-12 text-muted-foreground/30" />
			)}
		</div>
	);
}

interface ErrorBoundaryProps {
	fallback: ReactNode;
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class Book3DErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) return this.props.fallback;
		return this.props.children;
	}
}

export function Book3D({ coverUrl, title }: Book3DProps) {
	const fallback = <FallbackCover coverUrl={coverUrl} title={title} />;

	return (
		<Book3DErrorBoundary fallback={fallback}>
			<div className="aspect-square w-full cursor-grab active:cursor-grabbing transition-transform duration-300 hover:scale-[1.02]">
				<Canvas
					camera={{ position: [0, 0, 5], fov: 35 }}
					shadows
					gl={{ antialias: true }}
				>
					<Suspense fallback={null}>
						<ambientLight intensity={0.3} />

						<directionalLight position={[5, 5, 5]} intensity={1} castShadow />
						<mesh
							rotation={[-Math.PI / 2, 0, 0]}
							position={[0, -1.8, 0]}
							receiveShadow
						>
							<planeGeometry args={[10, 10]} />
							<shadowMaterial opacity={0.2} />
						</mesh>

						<spotLight
							position={[0, 5, 5]}
							intensity={1.2}
							angle={0.4}
							penumbra={0.5}
						/>
						{coverUrl ? (
							<BookMeshWithTexture coverUrl={coverUrl} />
						) : (
							<BookMeshPlain />
						)}
						<OrbitControls
							enableZoom={false}
							enablePan={false}
							minPolarAngle={Math.PI / 4}
							maxPolarAngle={(3 * Math.PI) / 4}
						/>
						<Environment preset="city" />
					</Suspense>
				</Canvas>
			</div>
		</Book3DErrorBoundary>
	);
}
