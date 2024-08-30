import { Button, Image} from "@nextui-org/react";
import React from "react";


const HeroComponent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-start gap-3  my-10">
      <div className=" space-y-3 relative">
        <h1 className="text-5xl font-semibold ">
          Buy, rent, or sell your property easily
        </h1>
        <p className=" text-sm dark:text-slate-300 text-slate-600 leading-7 max-w-xl">
          A great platform to buy, sell, or even rent your properties without
          any commissions. Discover an extensive range of listings that cater to
          your needs, whether you're looking for a cozy apartment, a spacious
          home, or a commercial space. Join a community of satisfied customers
          and find your perfect property today!
        </p>
        <div className="flex space-x-3">
          <Button radius="none" className=" bg-primary dark:text-slate-900 text-slate-300">
            Get Started
          </Button>
          <Button radius="none" color="primary" variant="bordered">
            Learn More
          </Button>
        </div>
      </div>
      <div className="hidden lg:block object-cover">
        <Image
          alt="hero image"
          height={400}
          src={
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXN0YXRlfGVufDB8fDB8fHww"
          }
        />
      </div>
    </div>
  );
};

export default HeroComponent;
