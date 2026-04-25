"use client";

import { allAccessories } from "@/data/accessories";

type AccessoryLayerProps = {
  selectedAccessories: string[];
  chefMode?: boolean;
};

export function AccessoryLayer({
  selectedAccessories,
  chefMode = false,
}: AccessoryLayerProps) {
  const accessories = selectedAccessories
    .map((id) => allAccessories.find((accessory) => accessory.id === id))
    .filter(Boolean);

  return (
    <group>
      {chefMode ? <ChefAccessories /> : null}
      {!chefMode
        ? accessories.map((accessory) => {
            if (!accessory) return null;
            if (accessory.slot === "head") {
              return <HeadAccessory color={accessory.color} id={accessory.id} key={accessory.id} />;
            }
            if (accessory.slot === "eyes") {
              return <Glasses color={accessory.color} key={accessory.id} />;
            }
            if (accessory.slot === "ears") {
              return <Headphones color={accessory.color} key={accessory.id} />;
            }
            if (accessory.slot === "neck") {
              return <NeckAccessory color={accessory.color} key={accessory.id} />;
            }
            return <Backpack color={accessory.color} key={accessory.id} />;
          })
        : null}
    </group>
  );
}

function HeadAccessory({ color, id }: { color: string; id: string }) {
  const isTall = id === "sombrero-copa";
  const isFlower = id === "diadema-flores" || id === "vincha-brote";

  return (
    <group position={[0, 0.88, 0.03]}>
      {isTall ? (
        <>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.36, 32]} />
            <meshStandardMaterial color={color} roughness={0.72} />
          </mesh>
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.48, 0.48, 0.08, 32]} />
            <meshStandardMaterial color={color} roughness={0.75} />
          </mesh>
        </>
      ) : (
        <>
          <mesh scale={[0.46, 0.2, 0.34]}>
            <sphereGeometry args={[1, 32, 16]} />
            <meshStandardMaterial color={color} roughness={0.68} />
          </mesh>
          <mesh position={[0, -0.1, 0.22]} scale={[0.44, 0.06, 0.12]}>
            <sphereGeometry args={[1, 32, 12]} />
            <meshStandardMaterial color={color} roughness={0.7} />
          </mesh>
        </>
      )}
      {isFlower ? (
        <mesh position={[0.23, 0.15, 0.22]} scale={[0.12, 0.12, 0.04]}>
          <sphereGeometry args={[1, 16, 8]} />
          <meshStandardMaterial color="#f2a7b8" roughness={0.72} />
        </mesh>
      ) : null}
    </group>
  );
}

function Glasses({ color }: { color: string }) {
  return (
    <group position={[0, 0.16, 0.8]}>
      <mesh position={[-0.23, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.13, 0.018, 12, 32]} />
        <meshStandardMaterial color={color} roughness={0.46} />
      </mesh>
      <mesh position={[0.23, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.13, 0.018, 12, 32]} />
        <meshStandardMaterial color={color} roughness={0.46} />
      </mesh>
      <mesh position={[0, 0, 0]} scale={[0.16, 0.015, 0.015]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} roughness={0.46} />
      </mesh>
    </group>
  );
}

function Headphones({ color }: { color: string }) {
  return (
    <group position={[0, 0.24, 0.08]}>
      <mesh position={[-0.48, 0, 0.23]} scale={[0.13, 0.18, 0.09]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color={color} roughness={0.62} />
      </mesh>
      <mesh position={[0.48, 0, 0.23]} scale={[0.13, 0.18, 0.09]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color={color} roughness={0.62} />
      </mesh>
      <mesh position={[0, 0.38, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.48, 0.025, 10, 36, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.62} />
      </mesh>
    </group>
  );
}

function NeckAccessory({ color }: { color: string }) {
  return (
    <group position={[0, -0.48, 0.58]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[0.52, 0.2, 0.52]}>
        <torusGeometry args={[0.8, 0.09, 12, 32]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.16, 0.04]} scale={[0.18, 0.22, 0.04]}>
        <coneGeometry args={[1, 1, 3]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
    </group>
  );
}

function Backpack({ color }: { color: string }) {
  return (
    <mesh position={[0, -0.08, -0.68]} scale={[0.42, 0.55, 0.16]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

function ChefAccessories() {
  return (
    <group>
      <group position={[0, 0.92, 0.08]}>
        <mesh position={[0, -0.12, 0]} scale={[0.44, 0.12, 0.32]}>
          <sphereGeometry args={[1, 32, 12]} />
          <meshStandardMaterial color="#fffaf1" roughness={0.5} />
        </mesh>
        {[-0.22, 0, 0.22].map((x) => (
          <mesh key={x} position={[x, 0.06, 0]} scale={[0.18, 0.16, 0.16]}>
            <sphereGeometry args={[1, 24, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.48} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, -0.36, 0.76]} scale={[0.45, 0.38, 0.04]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6f8b49" roughness={0.68} />
      </mesh>
      <group position={[0.58, -0.04, 0.58]} rotation={[0, 0, -0.55]}>
        <mesh position={[0, -0.25, 0]} scale={[0.035, 0.42, 0.035]}>
          <cylinderGeometry args={[1, 1, 1, 16]} />
          <meshStandardMaterial color="#b9814f" roughness={0.72} />
        </mesh>
        <mesh position={[0, 0.1, 0]} scale={[0.09, 0.16, 0.04]}>
          <sphereGeometry args={[1, 20, 10]} />
          <meshStandardMaterial color="#c9915c" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
