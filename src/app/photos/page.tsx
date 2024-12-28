// import Image from "next/image";

export default function PhotosPage() {
  // const gallery = 9;

  return (
    <main className="relative mx-auto flex min-h-screen flex-col items-center justify-center p-2">
      <h1>Nothing to see here yet...</h1>
      {/* <ul
        id="gallery"
        className="grid h-full w-full grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3"
      >
        {Array.from({ length: gallery }).map((_, index) => (
          <li
            key={index}
            className="relative h-[700px] w-full max-sm:h-[480px]"
          >
            <Image
              alt="Photo"
              src={`/images/photo-${index + 1}.webp`}
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              fill
            />
          </li>
        ))}
      </ul> */}
    </main>
  );
}
