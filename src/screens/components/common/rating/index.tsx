import {Text, View} from 'react-native';
import {RatingStyle} from './style';

interface RatingProps {
  rating: number;
}

export const Rating: React.FC<RatingProps> = ({rating}) => {
  // Calculate the number of full stars
  const fullStars = Math.floor(rating);
  // Calculate the fractional part (e.g. 0.2 from 4.2)
  const hasHalfStar = rating - fullStars >= 0.5;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      // Full star
      stars.push(
        <Text key={i} style={RatingStyle.ONStyle}>
          ★
        </Text>,
      );
    } else if (i === fullStars && hasHalfStar) {
      // Half star
      stars.push(
        <Text key={i} style={RatingStyle.ONStyle}>
          ☆
        </Text>,
      );
    } else {
      // Empty star
      stars.push(
        <Text key={i} style={RatingStyle.OFFStyle}>
          ★
        </Text>,
      );
    }
  }

  return <View style={RatingStyle.Stars}>{stars}</View>;
};
