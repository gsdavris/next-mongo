import Layout from "../components/layouts/Layout";
import Tabs from "../components/layouts/Tabs";

const IndexPage = ({ posts }) => {
  return (
    <Layout>
      <Tabs posts={ posts }/>
      <div className="p-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Hello NextJS + Tailwind
        </h1>
        <p className="p-4 text-gray-600 text-lg">
          This might take a little while to start up. <br />
          Wait a minute and restart the server if it's still not working.
        </p>
      </div>
    </Layout>
  );
};

export default IndexPage;

export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== 'production';
  let DEV_URL =  process.env.NEXT_PUBLIC_DEV_URL;
  let PROD_URL =  process.env.NEXT_PUBLIC_PROD_URL;

  console.log(process.env.NEXT_PUBLIC_DEV_URL);
  
  // request posts from api
  let response = await fetch(`http://localhost:3000/api/posts`);
  // extract the data
  console.log(response);
  // extract the data
  let data = await response.json();

  return {
      props: {
          posts: data['message'],
      },
  };
}