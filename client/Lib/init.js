import './buffer';

// connect to ipfs (local ipfs daemon)
import ipfs from 'ipfs-js';
window.ipfs = ipfs;
ipfs.setProvider();
