type Props = {};

export default function CardInfoEventName({}: Props) {
  return (
    <div className="top-[5%] left-[40%] rounded-xl w-[325px] bg-[#333333] p-6 gap-6 absolute text-white">
      <p className="font-girloyRegular">
        Enter a name for your event. The circled text in the screen shot below
        is the event name.
      </p>
      <picture>
        <img
          loading="lazy"
          src="https://assets.calendly.com/assets/frontend/media/help-name-e9154f7fadcc33548684.png"
          alt="name"
        />
      </picture>
      <button
        type="button"
        className="px-3 py-2 mt-6 border border-white w-full rounded-full"
      >
        Got it
      </button>
    </div>
  );
}
