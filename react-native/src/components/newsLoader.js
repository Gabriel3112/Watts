import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const NewsContent = (props) => (
  <ContentLoader
    speed={1}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#7A7A7A"
    {...props}
  >
    <Circle cx="69" cy="91" r="55" />
    <Rect x="132" y="75" rx="9" ry="9" width="200" height="17" />
    <Rect x="132" y="120" rx="9" ry="9" width="100" height="17" />
    <Rect x="250" y="120" rx="9" ry="9" width="50" height="17" />
    <Rect x="132" y="45" rx="9" ry="9" width="250" height="17" />
  </ContentLoader>
);

export default NewsContent;
