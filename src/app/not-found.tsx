export default function NotFound() {
  return (
    <div className="flex flex-col min-h-dvh p-12 justify-center items-center bg-bg-dark text-text-light">
      <h1 className="text-title">404</h1>
      <div className="text-center mt-4">
        <p className="text-p-lg">Lehte ei leitud!</p>
        <p className="text-p mt-2 opacity-80">Page not found!</p>
      </div>
    </div>
  );
}
