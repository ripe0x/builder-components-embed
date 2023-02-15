import React from "react";

type Props = {};

function Info({}: Props) {
  return (
    <div className="px-3 md:px-10 mx-auto md:max-w-2xl w-full">
      <div className="border border-slate-200 bg-white rounded-lg mx-auto max-w-screen-2xl w-full p-4 md:p-10">
        <div className="md:max-w-lg mx-auto">
          <h2 className="text-3xl font-bold">What is it this?</h2>
          <p>
            A component library— a set of lightly styled, reusable pieces of UI.
            These components make it easy both developers and non-technical
            users to create websites for their Nouns Builder DAO.
          </p>
          <p className="text-lg mb-5">
            Starting a DAO is hard. This component library is intended to reduce
            the barriers to entry by allowing DAO founders to keep using the
            website solutions they already know, while adding their Nounish DAO
            elements to the site.
          </p>

          <h2 className="text-3xl font-bold">How do I use it?</h2>
          {/* <p>
            The library is built using React and Next.js. It is available as an
            npm package, and can be installed using the following command:
          </p>

          <pre className="bg-slate-100 p-4 rounded-lg">
            <code className="text-slate-500">npm install @components</code>
          </pre>

          <p>
            Once installed, you can import the components you need into your
            project. For example, to import the <code>Info</code> component, you
            would use the following code:
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Info;
