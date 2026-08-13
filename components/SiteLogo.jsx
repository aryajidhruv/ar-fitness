function GymNameText({ gymName, className = "" }) {
  const [first, ...rest] = (gymName || "AR Fitness").trim().split(/\s+/);

  return (
    <span className={`font-display font-extrabold uppercase tracking-wide leading-none ${className}`}>
      {first}
      {rest.length > 0 && <> <span className="text-brass">{rest.join(" ")}</span></>}
    </span>
  );
}

function LogoMark({ logoUrl, gymName, boxClass, textClass, pulse = false }) {
  if (logoUrl) {
    return (
      <span
        className={`${boxClass} grid place-items-center border border-brass bg-iron overflow-hidden shrink-0 ${pulse ? "loader-logo-pulse" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoUrl} alt={gymName} className="w-full h-full object-contain p-1" />
      </span>
    );
  }

  return (
    <span
      className={`${boxClass} grid place-items-center border border-brass font-display font-black text-brass shrink-0 ${textClass} ${pulse ? "loader-logo-pulse" : ""}`}
    >
      AR
    </span>
  );
}

export default function SiteLogo({
  logoUrl,
  gymName = "AR Fitness",
  variant = "inline",
  className = ""
}) {
  if (variant === "loader") {
    return (
      <div className={`text-center ${className}`}>
        <LogoMark
          logoUrl={logoUrl}
          gymName={gymName}
          boxClass="loader-logo-box mx-auto"
          textClass="text-[38px]"
          pulse
        />
        {logoUrl ? (
          <p className="font-display font-extrabold uppercase tracking-wide text-[24px] leading-none mt-5">
            {gymName}
          </p>
        ) : (
          <>
            <p className="font-display font-extrabold uppercase tracking-wide text-[30px] leading-none mt-5">
              AR <span className="text-brass">Fitness</span>
            </p>
            <p className="font-cond uppercase tracking-[.24em] text-[11px] text-bone-dim mt-2.5">{gymName}</p>
          </>
        )}
      </div>
    );
  }

  const sizes = {
    inline: { box: "w-[34px] h-[34px]", text: "text-[17px]", name: "text-[22px]" },
    admin: { box: "w-8 h-8", text: "text-sm", name: "text-xl" },
    login: { box: "w-9 h-9", text: "text-base", name: "text-xl" }
  };
  const size = sizes[variant] || sizes.inline;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark
        logoUrl={logoUrl}
        gymName={gymName}
        boxClass={size.box}
        textClass={size.text}
      />
      <GymNameText gymName={gymName} className={size.name} />
    </span>
  );
}
