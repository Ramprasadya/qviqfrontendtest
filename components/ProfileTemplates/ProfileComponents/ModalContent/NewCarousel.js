import { useState, useEffect, useRef, Fragment } from "react";
import "./NewCarousel.css";
import * as hi from "react-icons/hi";

export default function NewCarousel({
  slides = [],
  speed = 3000,
  transitionSpeed = 500,
  slideWidth = 300,
  slideHeight = 300,
  autoScroll,
  manualMode,
}) {
  // if (slides.length < 2) {
  //   console.error("Please provide more slides");
  //   return null;
  // }

  const imgArray = slides.map((e) => {
    return {
      content: () => (
        <div className="withImage">
          <img src={e}></img>
        </div>
      ),
    };
  });

  const [visibleSlide, setVisibleSlide] = useState(1);
  const [hasTransitionClass, setHasTransitionClass] = useState(true);
  const [stateSlides, setStateSlides] = useState(imgArray);
  const [leftAndRightDisabled, setLeftAndRightDisabled] = useState(false);
  const intervalId = useRef(null);

  // useEffect with an empty array as the second parameter
  // will run only once, when the component mounts
  // this makes it an ideal place to trigger this functionality
  useEffect(() => {
    const slidesWithClones = [...imgArray];
    slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 1]);
    slidesWithClones.push(slidesWithClones[1]);
    setStateSlides(slidesWithClones);

    if (!!autoScroll) {
      start();
    }
  }, []);

  // Monitor changes for the visibleSlide value and react accordingly
  // We need to loop back to the first slide when scrolling right
  // from the last slide (and vice-versa for the other direction)
  // And we also need to disable the animations (by removing the
  // transition class from the relevant element) in order to give
  // the impression that the carousel is scrolling infinitely
  // during our slide-cloning/swapping mechanism
  useEffect(() => {
    if (visibleSlide == stateSlides.length - 1) {
      setLeftAndRightDisabled(true);
      setTimeout(() => {
        setHasTransitionClass(false);
        setVisibleSlide(1);
      }, transitionSpeed);
    }

    if (visibleSlide === 1) {
      setTimeout(() => {
        setHasTransitionClass(true);
      }, transitionSpeed);
    }

    if (visibleSlide === 0) {
      setLeftAndRightDisabled(true);
      setTimeout(() => {
        setHasTransitionClass(false);
        setVisibleSlide(stateSlides.length - 2);
      }, transitionSpeed);
    }

    if (visibleSlide == stateSlides.length - 2) {
      setTimeout(() => {
        setHasTransitionClass(true);
      }, transitionSpeed);
    }
  }, [visibleSlide]);

  // Whenever the left and right arrows are disabled
  // We want to enable them again after a specific
  // period of time, this is to prevent problematic
  // spamming of these controls during our clone
  // slide-cloning/swapping mechanism
  // Probably a better way to handle this though
  useEffect(() => {
    if (leftAndRightDisabled) {
      setTimeout(() => {
        setLeftAndRightDisabled(false);
      }, transitionSpeed * 2);
    }
  }, [leftAndRightDisabled]);

  const start = () => {
    if (intervalId.current != null) {
      return;
    }
    intervalId.current = setInterval(() => {
      setVisibleSlide((prevVisibleSlide) => {
        if (prevVisibleSlide + 1 === stateSlides.length) {
          return 0;
        }
        return prevVisibleSlide + 1;
      });
    }, speed);
  };

  const stop = () => {
    clearInterval(intervalId.current);
  };

  const calculateLeftMargin = () => {
    return "-" + visibleSlide * slideWidth + "px";
  };

  const slideDimensionStyles = () => {
    return { width: slideWidth + "px", height: slideHeight + "px" };
  };

  const scrollLeft = () => {
    setVisibleSlide(visibleSlide - 1);
  };

  const scrollRight = () => {
    setVisibleSlide(visibleSlide + 1);
  };

  const dotIsActive = (index) => {
    return (
      index === visibleSlide ||
      (index === 1 && visibleSlide === stateSlides.length - 1) ||
      (index === stateSlides.length - 2 && visibleSlide === 0)
    );
  };

  return (
    <div className="carousel">
      {/* {!autoScroll && !manualMode && (
          <div className="controls">
            <a onClick={start} href="javascript:;">
              Start
            </a>{" "}
            <a onClick={stop} href="javascript:;">
              Stop
            </a>
          </div>
        )} */}

      <div className="slidesContainer" style={slideDimensionStyles()}>
        {!!manualMode && slides.length > 1 && (
          <Fragment>
            <a
              onClick={!leftAndRightDisabled ? scrollLeft : null}
              // href="javascript:;"
              className={`scrollLeft anchorColor ${leftAndRightDisabled ? "disabled" : ""}`}
            >
              <hi.HiChevronLeft />
            </a>
            <a
              onClick={!leftAndRightDisabled ? scrollRight : null}
              // href="javascript:;"
              className={`scrollRight anchorColor ${
                leftAndRightDisabled ? "disabled" : ""
              }`}
            >
              <hi.HiChevronRight />
            </a>
          </Fragment>
        )}

        {/* <div className="slideIndicator">
            {stateSlides.map((slide, index) => {
              if (index === 0 || index === stateSlides.length - 1) {
                return null;
              }
              return (
                <div
                  key={index}
                  onClick={() => setVisibleSlide(index)}
                  className={`dot ${dotIsActive(index) ? "active" : ""}`}
                />
              );
            })}
          </div> */}

        <div
          id="slides"
          className={`slides ${hasTransitionClass ? "transition" : ""}`}
          style={{ left: calculateLeftMargin() }}
        >
          {stateSlides.map((slide, index) => {
            return (
              <div key={index} className="slide" style={slideDimensionStyles()}>
                {/* {!!slide.title && <div className="title">{slide.title}</div>} */}
                <div className="slideInner">{slide.content()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
