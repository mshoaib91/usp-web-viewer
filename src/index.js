import * as THREE from 'three';
import React from 'react';
import ReactDOM from 'react-dom';

// Our Javascript will go here.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const App = () => {
  return (
    <div>
      <h1>React Working</h1>
      <Body name='Shoaib'/>
  </div>
  );
};

const Body = (props) => {
  return (
    <p>{props.name}</p>
  );
}

ReactDOM.render(<App/>,  document.getElementById("app"));