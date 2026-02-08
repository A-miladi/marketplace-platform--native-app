import {useState, useEffect, useRef} from 'react';
import {Dimensions, ScaledSize} from 'react-native';

const useDimensionsListener = () => {
  const [screenDimension, setScreenDimension] = useState(
    Dimensions.get('screen'),
  );
  const [windowDimension, setWindowDimension] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    function handleDimensionChange({
      window,
      screen,
    }: {
      window: ScaledSize;
      screen: ScaledSize;
    }) {
      setWindowDimension(window);
      setScreenDimension(screen);
    }

    Dimensions.addEventListener('change', handleDimensionChange);
    return () => {
      //@ts-ignore
      Dimensions.removeEventListener('change', handleDimensionChange);
    };
  }, []);

  return {
    screen: screenDimension,
    window: windowDimension,
  };
};

const percentageCalculation = (max: number, val: number) => max * (val / 100);

const fontCalculation = (height: number, width: number, val: number) => {
  const widthDimension = height > width ? width : height;
  const aspectRatioBasedHeight = (16 / 9) * widthDimension;
  return percentageCalculation(
    Math.sqrt(
      Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2),
    ),
    val,
  );
};

export const useDimensionsChange = (effect: any) => {
  const hasMountRef = useRef(false);
  const dimensions = useDimensionsListener();

  useEffect(() => {
    if (hasMountRef.current) {
      const destroy = effect(dimensions);
      let cleanUp: any = () => null;
      if (typeof destroy === 'function') {
        cleanUp = destroy;
      }
      return () => cleanUp();
    } else {
      hasMountRef.current = true;
    }
  }, [dimensions, effect]);
};

export const RH = (h: number) => {
  const {height} = Dimensions.get('window');
  return percentageCalculation(height, h);
};

export const RW = (w: number) => {
  const {width} = Dimensions.get('window');
  return percentageCalculation(width, w);
};

export const RFS = (f: number) => {
  const {height, width} = Dimensions.get('window');
  return fontCalculation(height, width, f);
};
