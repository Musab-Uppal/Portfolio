import Fade from "./Fade";

const NUMS = {
  "About Me": "01",
  Experience: "02",
  Projects: "03",
  Skills: "04",
  Interests: "05",
};

const Section = ({ title, children, id, noPad = false }) => {
  const num = NUMS[title] ?? "—";
  const sectionId = id || title?.toLowerCase().replace(/\s+/g, "-");

  return (
    <section
      id={sectionId}
      className="relative z-10"
      style={{ padding: noPad ? "60px 24px" : "80px 24px" }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {title && (
          <Fade>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "44px",
              }}
            >
              <span className="sec-num">{num}.</span>
              <h2 className="sec-title" style={{ marginLeft: "14px" }}>
                {title}
              </h2>
              <div className="sec-line" />
            </div>
          </Fade>
        )}

        <Fade delay={70}>
          <div className="card" style={{ padding: "36px" }}>
            {children}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Section;
