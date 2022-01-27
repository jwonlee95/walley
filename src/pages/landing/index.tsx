import React, { useContext, useEffect, useState } from "react";
import { AppWrapper, Footer } from "components";
import { Button } from "@mui/material";
import { IMAGES } from "assets";
import { UserContext } from "contexts";
import { useHistory } from "react-router-dom";

const {
  BE,
  BoardGraph,
  BrushTouch,
  BudgetPlannerIMG,
  LargeRectangle,
  SmallRectangle,
  SummarySketch,
  SpendingSketch,
  CategorySketch,
} = IMAGES.landing;
const MainSection: React.FC<{}> = () => {
  const history = useHistory();
  const [redirect, setRedirect] = useState<boolean>(false);
  const { user } = useContext(UserContext).userState;

  useEffect(() => {
    if (user) {
      setRedirect(true);
    }
  }, []);
  useEffect(() => {
    if (redirect) {
      history.push("/home");
    }
  }, [redirect]);
  return (
    <section className="landing-section">
      {/* <div className="test"></div> */}
      <div className="wrapper-flex">
        <div className="text-wrapper">
          <img className="decoration-svg be" src={BE} alt="be" />
          <div className="border-wrapper">
            <h1 className="section-heading heading-space">
              BE THE OWNER OF YOUR MONEY
            </h1>
          </div>
          <p className="section-para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,
          </p>
          <Button className="explore-btn">GET STARTED</Button>
        </div>

        <div className="img-wrapper">
          <img
            className="budget-planner"
            src={BudgetPlannerIMG}
            alt="budget-planner"
          />
        </div>
      </div>
    </section>
  );
};

const IntroSection: React.FC<{}> = () => {
  return (
    <div className="stacked-rectangle-wrapper">
      <section className="landing-section">
        <div className="wrapper-flex border-section">
          <div className="img-wrapper">
            <img className="board-graph" src={BoardGraph} alt="graph-img" />
          </div>
          <div className="text-wrapper">
            <img
              className="decoration-svg brush-touch"
              src={BrushTouch}
              alt="brush-touch"
            />
            <h1 className="section-heading heading-point">At</h1>
            <h1 className="section-heading">A Glance</h1>
            <p className="section-para border-wrapper">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam,
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FunctionalityCompProps {
  title: string;
  content: string;
  imgSrc: string;
}
const FunctionalityComp: React.FC<FunctionalityCompProps> = (props) => {
  return (
    <div className="functionality-container">
      <div className="sketch-img-wrapper">
        <img src={props.imgSrc} alt="testing" />
      </div>
      <div>
        <h3>{props.title}</h3>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

const FunctionalitySection: React.FC<{}> = () => {
  const imgList = [SummarySketch, SpendingSketch, CategorySketch];
  const titleList = ["Summary", "Add Spendings", "Category"];
  const contentList = [
    "See your spending at a glance",
    "Add income/expenses easily",
    "Categorize spendings for a detailed analysis",
  ];
  return (
    <section className="landing-section">
      <div className="wrapper-flex wrap">
        <div className="section-subheading-wrapper">
          <img
            className="decoration-svg large-rectangle"
            src={LargeRectangle}
            alt="decoration-large"
          />
          <img
            className="decoration-svg small-rectangle"
            src={SmallRectangle}
            alt="decoration-small"
          ></img>
          <h1 className="section-subheading text-center">How it works</h1>
        </div>

        <div className="funtionalities-layout-container">
          {imgList.map((img, idx) => (
            <FunctionalityComp
              imgSrc={img}
              title={titleList[idx]}
              content={contentList[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const LandingPage: React.FC<{}> = () => {
  return (
    <AppWrapper title="">
      <MainSection />
      <IntroSection />
      <FunctionalitySection />
      <Footer />
    </AppWrapper>
  );
};
