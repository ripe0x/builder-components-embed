import React from "react";

type Props = {};

function Info({}: Props) {
  return (
    <div className="mx-auto w-full px-3 md:max-w-2xl md:px-10">
      <div className="mx-auto w-full max-w-screen-2xl rounded-lg border border-slate-200 bg-white p-4 md:p-10">
        <div className="mx-auto md:max-w-lg">
          <p className="mb-5 text-lg">
            Starting a DAO is hard. This component library is intended to reduce
            the barriers to entry by allowing DAO founders to keep using the
            website solutions they already know, while adding their Nounish DAO
            elements to the site.
          </p>
          <h2 className="text-3xl font-bold">What is it this?</h2>
          <p>
            A component library— a set of lightly styled, reusable pieces of UI.
            These components make it easy both developers and non-technical
            users to create websites for their Nouns Builder DAO.
          </p>

          <h2 className="text-3xl font-bold">How do I use it?</h2>
          <p>
            TKTK The library is built using React. It is available as an npm
            package, and can be installed using the following command:
          </p>

          <pre className="rounded-lg bg-slate-100 p-4">
            <code className="text-slate-500">npm install @tktk</code>
          </pre>

          <p>
            Once installed, you can import the components you need into your
            project. For example, to import the <code>Auction</code> component,
            you would use the following code:
          </p>

          <pre className="rounded-lg bg-slate-100 p-4">
            <code className="text-slate-500">tktk</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Info;
