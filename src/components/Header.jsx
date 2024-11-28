import React from "react";

const Header = () => {
  return (
    <>
      <div className="w-full h-[100vh] bg-image-hero bg-no-repeat bg-center bg-cover">
        <header className="p-5 bg-primary font-JapanSans sticky top-0 opacity-0 duration-1000 hover:opacity-100">
          <h2>
            Header Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Vitae, sapiente.{" "}
          </h2>
        </header>
      </div>
    </>
  );
};

export default Header;
