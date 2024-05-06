import Header from "./Header";

const withLayout = (Page: React.ComponentType) => {
  return () => (
    <div>
      <Header />
      <Page />
    </div>
  );
};

export default withLayout;
