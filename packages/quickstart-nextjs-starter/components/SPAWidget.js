import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function loadMf(mfName, customProps) {
  const System = window.System;
  return System.import('single-spa').then(function (singleSpa) {
    return System.import(mfName).then(parcel => {
      const domElement = document.getElementById('single-spa-application:' + mfName);
      const parcelProps = {domElement, ...customProps};
      return singleSpa.mountRootParcel(parcel, parcelProps);
    });
  });
}

export default function SSPAWidget({ mfName, customProps }) {
  useEffect(() => {
    const parcelPromise = loadMf(mfName, customProps);
    return () => {
      parcelPromise.then((parcel) =>{
        parcel.unmount;
      }
      );
    };
  }, []);
  return (
    <span id={'single-spa-application:'+mfName}>
    </span>
  );
}

export function createImportMapFragment({mfName, mfURL}) {
  return `
    {
        "imports": {
            "${mfName}": "${mfURL}"
        }
    }`;
}

SSPAWidget.propTypes = {
  mfName: PropTypes.string.isRequired,
  mfURL: PropTypes.string.isRequired,
  customProps: PropTypes.object.isRequired,
};
