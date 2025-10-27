import RailSection from '../../RailSection/RailSection';

export const FeatureProductRail = ({ title, children }) => {
  return (
    <RailSection
      title={title}
      carouseloptions={{
        slidesPerView: 2,
        breakpoints: {
          400: {
            slidesPerView: 1.15,
          },
          768: {
            slidesPerView: 1.1,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 2,
          },
          1550: {
            slidesPerView: 3,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        },
      }}
    >
      {children}
    </RailSection>
  );
};
