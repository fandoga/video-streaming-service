import { Button } from "@/components/ui/button";

const MovieBanner = () => {
  return (
    <div className="relative h-125 w-full overflow-hidden">
      <img
        className="size-full object-cover"
        src="img/avatar-banner.png"
        alt="avatar-banner"
      />
      <div
        className="absolute inset-0 w-[40%] bg-gradient-to-r from-black/90 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-0 top-90 max-w-7xl mx-auto">
        <Button
          className="rounded-full cursor-pointer text-white h-12 text-lg hover:scale-103"
          size={"lg"}
        >
          Watch now
        </Button>
      </div>
    </div>
  );
};

export default MovieBanner;
