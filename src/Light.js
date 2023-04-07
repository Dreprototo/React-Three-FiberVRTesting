function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 6, 0]} castShadow shadow-mapSize={[4096, 4096]} />
    </>
  );
}

export default Lights;