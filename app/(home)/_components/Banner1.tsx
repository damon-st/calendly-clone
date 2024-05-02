import Link from "next/link";

export default function Banner1() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-7xl flex items-center justify-center">
        <div className="w-full rounded-3xl bg-[#0A2540] p-[72px] flex flex-col items-center justify-center gap-6">
          <h2 className="text-white font-girloyBold text-5xl mb-6">
            Power up your scheduling
          </h2>
          <p className="text-white text-lg font-girloyRegular text-center mb-6 max-w-xl">
            Get started with the world&quaot;s leading Scheduling Automation
            Platform in seconds – for free.
          </p>
          <div className="w-full flex items-center justify-center gap-2">
            <Link href="/signup" className="btnSigupFooter ">
              Regístrese gratis
            </Link>
            <Link href="#" className="btnRequestDemo ">
              Solicita una demostración
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
