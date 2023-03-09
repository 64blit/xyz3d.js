import * as Q from "three";
import { TrianglesDrawMode as Ss, TriangleFanDrawMode as Qt, TriangleStripDrawMode as In, Loader as Mn, LoaderUtils as qt, FileLoader as It, Color as Me, SpotLight as vs, PointLight as Rs, DirectionalLight as Is, MeshBasicMaterial as We, sRGBEncoding as dt, MeshPhysicalMaterial as je, Vector2 as Re, Matrix4 as Mt, Vector3 as Le, Quaternion as Cn, InstancedMesh as Ms, Object3D as Ln, TextureLoader as Cs, ImageBitmapLoader as Ls, BufferAttribute as xt, InterleavedBuffer as Ns, InterleavedBufferAttribute as Ds, LinearFilter as $e, LinearMipmapLinearFilter as Nn, RepeatWrapping as Jt, PointsMaterial as ks, Material as Zt, LineBasicMaterial as Os, MeshStandardMaterial as Dn, DoubleSide as Us, PropertyBinding as Ps, BufferGeometry as on, SkinnedMesh as Fs, Mesh as kn, LineSegments as Bs, Line as Hs, LineLoop as Gs, Points as zs, Group as jt, PerspectiveCamera as Zs, MathUtils as js, OrthographicCamera as On, Skeleton as Ks, InterpolateLinear as Un, AnimationClip as Vs, Bone as Xs, NearestFilter as Ws, NearestMipmapNearestFilter as Ys, LinearMipmapNearestFilter as Qs, NearestMipmapLinearFilter as qs, ClampToEdgeWrapping as Js, MirroredRepeatWrapping as $s, InterpolateDiscrete as er, FrontSide as tr, Texture as mn, VectorKeyframeTrack as nr, QuaternionKeyframeTrack as gn, NumberKeyframeTrack as sr, Box3 as rr, Sphere as ir, Interpolant as or, SRGBColorSpace as _n, LinearSRGBColorSpace as ar, DataTextureLoader as Pn, HalfFloatType as He, FloatType as qe, DataUtils as Ye, LinearEncoding as $t, RGBAFormat as cr, RedFormat as lr, Float32BufferAttribute as Fn, WebGLRenderTarget as Rt, UniformsUtils as en, ShaderMaterial as Qe, AdditiveBlending as hr, Clock as ur } from "three";
import Et from "camera-controls";
function bn(u, e) {
  if (e === Ss)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), u;
  if (e === Qt || e === In) {
    let t = u.getIndex();
    if (t === null) {
      const r = [], a = u.getAttribute("position");
      if (a !== void 0) {
        for (let c = 0; c < a.count; c++)
          r.push(c);
        u.setIndex(r), t = u.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), u;
    }
    const n = t.count - 2, s = [];
    if (e === Qt)
      for (let r = 1; r <= n; r++)
        s.push(t.getX(0)), s.push(t.getX(r)), s.push(t.getX(r + 1));
    else
      for (let r = 0; r < n; r++)
        r % 2 === 0 ? (s.push(t.getX(r)), s.push(t.getX(r + 1)), s.push(t.getX(r + 2))) : (s.push(t.getX(r + 2)), s.push(t.getX(r + 1)), s.push(t.getX(r)));
    s.length / 3 !== n && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const i = u.clone();
    return i.setIndex(s), i.clearGroups(), i;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), u;
}
class xr extends Mn {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new gr(t);
    }), this.register(function(t) {
      return new Er(t);
    }), this.register(function(t) {
      return new Sr(t);
    }), this.register(function(t) {
      return new vr(t);
    }), this.register(function(t) {
      return new br(t);
    }), this.register(function(t) {
      return new Tr(t);
    }), this.register(function(t) {
      return new Ar(t);
    }), this.register(function(t) {
      return new wr(t);
    }), this.register(function(t) {
      return new mr(t);
    }), this.register(function(t) {
      return new yr(t);
    }), this.register(function(t) {
      return new _r(t);
    }), this.register(function(t) {
      return new dr(t);
    }), this.register(function(t) {
      return new Rr(t);
    }), this.register(function(t) {
      return new Ir(t);
    });
  }
  load(e, t, n, s) {
    const i = this;
    let r;
    this.resourcePath !== "" ? r = this.resourcePath : this.path !== "" ? r = this.path : r = qt.extractUrlBase(e), this.manager.itemStart(e);
    const a = function(h) {
      s ? s(h) : console.error(h), i.manager.itemError(e), i.manager.itemEnd(e);
    }, c = new It(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(e, function(h) {
      try {
        i.parse(h, r, function(d) {
          t(d), i.manager.itemEnd(e);
        }, a);
      } catch (d) {
        a(d);
      }
    }, n, a);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setDDSLoader() {
    throw new Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, n, s) {
    let i;
    const r = {}, a = {}, c = new TextDecoder();
    if (typeof e == "string")
      i = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (c.decode(new Uint8Array(e, 0, 4)) === Bn) {
        try {
          r[J.KHR_BINARY_GLTF] = new Mr(e);
        } catch (f) {
          s && s(f);
          return;
        }
        i = JSON.parse(r[J.KHR_BINARY_GLTF].content);
      } else
        i = JSON.parse(c.decode(e));
    else
      i = e;
    if (i.asset === void 0 || i.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const h = new zr(i, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    h.fileLoader.setRequestHeader(this.requestHeader);
    for (let d = 0; d < this.pluginCallbacks.length; d++) {
      const f = this.pluginCallbacks[d](h);
      a[f.name] = f, r[f.name] = !0;
    }
    if (i.extensionsUsed)
      for (let d = 0; d < i.extensionsUsed.length; ++d) {
        const f = i.extensionsUsed[d], m = i.extensionsRequired || [];
        switch (f) {
          case J.KHR_MATERIALS_UNLIT:
            r[f] = new pr();
            break;
          case J.KHR_DRACO_MESH_COMPRESSION:
            r[f] = new Cr(i, this.dracoLoader);
            break;
          case J.KHR_TEXTURE_TRANSFORM:
            r[f] = new Lr();
            break;
          case J.KHR_MESH_QUANTIZATION:
            r[f] = new Nr();
            break;
          default:
            m.indexOf(f) >= 0 && a[f] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + f + '".');
        }
      }
    h.setExtensions(r), h.setPlugins(a), h.parse(n, s);
  }
  parseAsync(e, t) {
    const n = this;
    return new Promise(function(s, i) {
      n.parse(e, t, s, i);
    });
  }
}
function fr() {
  let u = {};
  return {
    get: function(e) {
      return u[e];
    },
    add: function(e, t) {
      u[e] = t;
    },
    remove: function(e) {
      delete u[e];
    },
    removeAll: function() {
      u = {};
    }
  };
}
const J = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class dr {
  constructor(e) {
    this.parser = e, this.name = J.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n];
      i.extensions && i.extensions[this.name] && i.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, i.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, n = "light:" + e;
    let s = t.cache.get(n);
    if (s)
      return s;
    const i = t.json, c = ((i.extensions && i.extensions[this.name] || {}).lights || [])[e];
    let h;
    const d = new Me(16777215);
    c.color !== void 0 && d.fromArray(c.color);
    const f = c.range !== void 0 ? c.range : 0;
    switch (c.type) {
      case "directional":
        h = new Is(d), h.target.position.set(0, 0, -1), h.add(h.target);
        break;
      case "point":
        h = new Rs(d), h.distance = f;
        break;
      case "spot":
        h = new vs(d), h.distance = f, c.spot = c.spot || {}, c.spot.innerConeAngle = c.spot.innerConeAngle !== void 0 ? c.spot.innerConeAngle : 0, c.spot.outerConeAngle = c.spot.outerConeAngle !== void 0 ? c.spot.outerConeAngle : Math.PI / 4, h.angle = c.spot.outerConeAngle, h.penumbra = 1 - c.spot.innerConeAngle / c.spot.outerConeAngle, h.target.position.set(0, 0, -1), h.add(h.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + c.type);
    }
    return h.position.set(0, 0, 0), h.decay = 2, Be(h, c), c.intensity !== void 0 && (h.intensity = c.intensity), h.name = t.createUniqueName(c.name || "light_" + e), s = Promise.resolve(h), t.cache.add(n, s), s;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, n = this.parser, i = n.json.nodes[e], a = (i.extensions && i.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(c) {
      return n._getNodeRef(t.cache, a, c);
    });
  }
}
class pr {
  constructor() {
    this.name = J.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return We;
  }
  extendParams(e, t, n) {
    const s = [];
    e.color = new Me(1, 1, 1), e.opacity = 1;
    const i = t.pbrMetallicRoughness;
    if (i) {
      if (Array.isArray(i.baseColorFactor)) {
        const r = i.baseColorFactor;
        e.color.fromArray(r), e.opacity = r[3];
      }
      i.baseColorTexture !== void 0 && s.push(n.assignTexture(e, "map", i.baseColorTexture, dt));
    }
    return Promise.all(s);
  }
}
class mr {
  constructor(e) {
    this.parser = e, this.name = J.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = s.extensions[this.name].emissiveStrength;
    return i !== void 0 && (t.emissiveIntensity = i), Promise.resolve();
  }
}
class gr {
  constructor(e) {
    this.parser = e, this.name = J.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : je;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], r = s.extensions[this.name];
    if (r.clearcoatFactor !== void 0 && (t.clearcoat = r.clearcoatFactor), r.clearcoatTexture !== void 0 && i.push(n.assignTexture(t, "clearcoatMap", r.clearcoatTexture)), r.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = r.clearcoatRoughnessFactor), r.clearcoatRoughnessTexture !== void 0 && i.push(n.assignTexture(t, "clearcoatRoughnessMap", r.clearcoatRoughnessTexture)), r.clearcoatNormalTexture !== void 0 && (i.push(n.assignTexture(t, "clearcoatNormalMap", r.clearcoatNormalTexture)), r.clearcoatNormalTexture.scale !== void 0)) {
      const a = r.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new Re(a, a);
    }
    return Promise.all(i);
  }
}
class _r {
  constructor(e) {
    this.parser = e, this.name = J.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : je;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], r = s.extensions[this.name];
    return r.iridescenceFactor !== void 0 && (t.iridescence = r.iridescenceFactor), r.iridescenceTexture !== void 0 && i.push(n.assignTexture(t, "iridescenceMap", r.iridescenceTexture)), r.iridescenceIor !== void 0 && (t.iridescenceIOR = r.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), r.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = r.iridescenceThicknessMinimum), r.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = r.iridescenceThicknessMaximum), r.iridescenceThicknessTexture !== void 0 && i.push(n.assignTexture(t, "iridescenceThicknessMap", r.iridescenceThicknessTexture)), Promise.all(i);
  }
}
class br {
  constructor(e) {
    this.parser = e, this.name = J.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : je;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [];
    t.sheenColor = new Me(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const r = s.extensions[this.name];
    return r.sheenColorFactor !== void 0 && t.sheenColor.fromArray(r.sheenColorFactor), r.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = r.sheenRoughnessFactor), r.sheenColorTexture !== void 0 && i.push(n.assignTexture(t, "sheenColorMap", r.sheenColorTexture, dt)), r.sheenRoughnessTexture !== void 0 && i.push(n.assignTexture(t, "sheenRoughnessMap", r.sheenRoughnessTexture)), Promise.all(i);
  }
}
class Tr {
  constructor(e) {
    this.parser = e, this.name = J.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : je;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], r = s.extensions[this.name];
    return r.transmissionFactor !== void 0 && (t.transmission = r.transmissionFactor), r.transmissionTexture !== void 0 && i.push(n.assignTexture(t, "transmissionMap", r.transmissionTexture)), Promise.all(i);
  }
}
class Ar {
  constructor(e) {
    this.parser = e, this.name = J.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : je;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], r = s.extensions[this.name];
    t.thickness = r.thicknessFactor !== void 0 ? r.thicknessFactor : 0, r.thicknessTexture !== void 0 && i.push(n.assignTexture(t, "thicknessMap", r.thicknessTexture)), t.attenuationDistance = r.attenuationDistance || 1 / 0;
    const a = r.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new Me(a[0], a[1], a[2]), Promise.all(i);
  }
}
class wr {
  constructor(e) {
    this.parser = e, this.name = J.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : je;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = s.extensions[this.name];
    return t.ior = i.ior !== void 0 ? i.ior : 1.5, Promise.resolve();
  }
}
class yr {
  constructor(e) {
    this.parser = e, this.name = J.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : je;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], r = s.extensions[this.name];
    t.specularIntensity = r.specularFactor !== void 0 ? r.specularFactor : 1, r.specularTexture !== void 0 && i.push(n.assignTexture(t, "specularIntensityMap", r.specularTexture));
    const a = r.specularColorFactor || [1, 1, 1];
    return t.specularColor = new Me(a[0], a[1], a[2]), r.specularColorTexture !== void 0 && i.push(n.assignTexture(t, "specularColorMap", r.specularColorTexture, dt)), Promise.all(i);
  }
}
class Er {
  constructor(e) {
    this.parser = e, this.name = J.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, n = t.json, s = n.textures[e];
    if (!s.extensions || !s.extensions[this.name])
      return null;
    const i = s.extensions[this.name], r = t.options.ktx2Loader;
    if (!r) {
      if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, i.source, r);
  }
}
class Sr {
  constructor(e) {
    this.parser = e, this.name = J.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, s = n.json, i = s.textures[e];
    if (!i.extensions || !i.extensions[t])
      return null;
    const r = i.extensions[t], a = s.images[r.source];
    let c = n.textureLoader;
    if (a.uri) {
      const h = n.options.manager.getHandler(a.uri);
      h !== null && (c = h);
    }
    return this.detectSupport().then(function(h) {
      if (h)
        return n.loadTextureImage(e, r.source, c);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class vr {
  constructor(e) {
    this.parser = e, this.name = J.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, s = n.json, i = s.textures[e];
    if (!i.extensions || !i.extensions[t])
      return null;
    const r = i.extensions[t], a = s.images[r.source];
    let c = n.textureLoader;
    if (a.uri) {
      const h = n.options.manager.getHandler(a.uri);
      h !== null && (c = h);
    }
    return this.detectSupport().then(function(h) {
      if (h)
        return n.loadTextureImage(e, r.source, c);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class Rr {
  constructor(e) {
    this.name = J.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, n = t.bufferViews[e];
    if (n.extensions && n.extensions[this.name]) {
      const s = n.extensions[this.name], i = this.parser.getDependency("buffer", s.buffer), r = this.parser.options.meshoptDecoder;
      if (!r || !r.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return i.then(function(a) {
        const c = s.byteOffset || 0, h = s.byteLength || 0, d = s.count, f = s.byteStride, m = new Uint8Array(a, c, h);
        return r.decodeGltfBufferAsync ? r.decodeGltfBufferAsync(d, f, m, s.mode, s.filter).then(function(T) {
          return T.buffer;
        }) : r.ready.then(function() {
          const T = new ArrayBuffer(d * f);
          return r.decodeGltfBuffer(new Uint8Array(T), d, f, m, s.mode, s.filter), T;
        });
      });
    } else
      return null;
  }
}
class Ir {
  constructor(e) {
    this.name = J.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, n = t.nodes[e];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0)
      return null;
    const s = t.meshes[n.mesh];
    for (const h of s.primitives)
      if (h.mode !== ve.TRIANGLES && h.mode !== ve.TRIANGLE_STRIP && h.mode !== ve.TRIANGLE_FAN && h.mode !== void 0)
        return null;
    const r = n.extensions[this.name].attributes, a = [], c = {};
    for (const h in r)
      a.push(this.parser.getDependency("accessor", r[h]).then((d) => (c[h] = d, c[h])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((h) => {
      const d = h.pop(), f = d.isGroup ? d.children : [d], m = h[0].count, T = [];
      for (const U of f) {
        const B = new Mt(), M = new Le(), N = new Cn(), Z = new Le(1, 1, 1), R = new Ms(U.geometry, U.material, m);
        for (let L = 0; L < m; L++)
          c.TRANSLATION && M.fromBufferAttribute(c.TRANSLATION, L), c.ROTATION && N.fromBufferAttribute(c.ROTATION, L), c.SCALE && Z.fromBufferAttribute(c.SCALE, L), R.setMatrixAt(L, B.compose(M, N, Z));
        for (const L in c)
          L !== "TRANSLATION" && L !== "ROTATION" && L !== "SCALE" && U.geometry.setAttribute(L, c[L]);
        Ln.prototype.copy.call(R, U), R.frustumCulled = !1, this.parser.assignFinalMaterial(R), T.push(R);
      }
      return d.isGroup ? (d.clear(), d.add(...T), d) : T[0];
    }));
  }
}
const Bn = "glTF", lt = 12, Tn = { JSON: 1313821514, BIN: 5130562 };
class Mr {
  constructor(e) {
    this.name = J.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, lt), n = new TextDecoder();
    if (this.header = {
      magic: n.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== Bn)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - lt, i = new DataView(e, lt);
    let r = 0;
    for (; r < s; ) {
      const a = i.getUint32(r, !0);
      r += 4;
      const c = i.getUint32(r, !0);
      if (r += 4, c === Tn.JSON) {
        const h = new Uint8Array(e, lt + r, a);
        this.content = n.decode(h);
      } else if (c === Tn.BIN) {
        const h = lt + r;
        this.body = e.slice(h, h + a);
      }
      r += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Cr {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = J.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const n = this.json, s = this.dracoLoader, i = e.extensions[this.name].bufferView, r = e.extensions[this.name].attributes, a = {}, c = {}, h = {};
    for (const d in r) {
      const f = tn[d] || d.toLowerCase();
      a[f] = r[d];
    }
    for (const d in e.attributes) {
      const f = tn[d] || d.toLowerCase();
      if (r[d] !== void 0) {
        const m = n.accessors[e.attributes[d]], T = Je[m.componentType];
        h[f] = T.name, c[f] = m.normalized === !0;
      }
    }
    return t.getDependency("bufferView", i).then(function(d) {
      return new Promise(function(f) {
        s.decodeDracoFile(d, function(m) {
          for (const T in m.attributes) {
            const U = m.attributes[T], B = c[T];
            B !== void 0 && (U.normalized = B);
          }
          f(m);
        }, a, h);
      });
    });
  }
}
class Lr {
  constructor() {
    this.name = J.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return t.texCoord !== void 0 && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Nr {
  constructor() {
    this.name = J.KHR_MESH_QUANTIZATION;
  }
}
class Hn extends or {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, s = this.valueSize, i = e * s * 3 + s;
    for (let r = 0; r !== s; r++)
      t[r] = n[i + r];
    return t;
  }
  interpolate_(e, t, n, s) {
    const i = this.resultBuffer, r = this.sampleValues, a = this.valueSize, c = a * 2, h = a * 3, d = s - t, f = (n - t) / d, m = f * f, T = m * f, U = e * h, B = U - h, M = -2 * T + 3 * m, N = T - m, Z = 1 - M, R = N - m + f;
    for (let L = 0; L !== a; L++) {
      const W = r[B + L + a], H = r[B + L + c] * d, z = r[U + L + a], b = r[U + L] * d;
      i[L] = Z * W + R * H + M * z + N * b;
    }
    return i;
  }
}
const Dr = new Cn();
class kr extends Hn {
  interpolate_(e, t, n, s) {
    const i = super.interpolate_(e, t, n, s);
    return Dr.fromArray(i).normalize().toArray(i), i;
  }
}
const ve = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, Je = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, An = {
  9728: Ws,
  9729: $e,
  9984: Ys,
  9985: Qs,
  9986: qs,
  9987: Nn
}, wn = {
  33071: Js,
  33648: $s,
  10497: Jt
}, Kt = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, tn = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv2",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, Pe = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Or = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Un,
  STEP: er
}, Vt = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Ur(u) {
  return u.DefaultMaterial === void 0 && (u.DefaultMaterial = new Dn({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: tr
  })), u.DefaultMaterial;
}
function ht(u, e, t) {
  for (const n in t.extensions)
    u[n] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[n] = t.extensions[n]);
}
function Be(u, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(u.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Pr(u, e, t) {
  let n = !1, s = !1, i = !1;
  for (let h = 0, d = e.length; h < d; h++) {
    const f = e[h];
    if (f.POSITION !== void 0 && (n = !0), f.NORMAL !== void 0 && (s = !0), f.COLOR_0 !== void 0 && (i = !0), n && s && i)
      break;
  }
  if (!n && !s && !i)
    return Promise.resolve(u);
  const r = [], a = [], c = [];
  for (let h = 0, d = e.length; h < d; h++) {
    const f = e[h];
    if (n) {
      const m = f.POSITION !== void 0 ? t.getDependency("accessor", f.POSITION) : u.attributes.position;
      r.push(m);
    }
    if (s) {
      const m = f.NORMAL !== void 0 ? t.getDependency("accessor", f.NORMAL) : u.attributes.normal;
      a.push(m);
    }
    if (i) {
      const m = f.COLOR_0 !== void 0 ? t.getDependency("accessor", f.COLOR_0) : u.attributes.color;
      c.push(m);
    }
  }
  return Promise.all([
    Promise.all(r),
    Promise.all(a),
    Promise.all(c)
  ]).then(function(h) {
    const d = h[0], f = h[1], m = h[2];
    return n && (u.morphAttributes.position = d), s && (u.morphAttributes.normal = f), i && (u.morphAttributes.color = m), u.morphTargetsRelative = !0, u;
  });
}
function Fr(u, e) {
  if (u.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, n = e.weights.length; t < n; t++)
      u.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (u.morphTargetInfluences.length === t.length) {
      u.morphTargetDictionary = {};
      for (let n = 0, s = t.length; n < s; n++)
        u.morphTargetDictionary[t[n]] = n;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Br(u) {
  const e = u.extensions && u.extensions[J.KHR_DRACO_MESH_COMPRESSION];
  let t;
  return e ? t = "draco:" + e.bufferView + ":" + e.indices + ":" + yn(e.attributes) : t = u.indices + ":" + yn(u.attributes) + ":" + u.mode, t;
}
function yn(u) {
  let e = "";
  const t = Object.keys(u).sort();
  for (let n = 0, s = t.length; n < s; n++)
    e += t[n] + ":" + u[t[n]] + ";";
  return e;
}
function nn(u) {
  switch (u) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function Hr(u) {
  return u.search(/\.jpe?g($|\?)/i) > 0 || u.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : u.search(/\.webp($|\?)/i) > 0 || u.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const Gr = new Mt();
class zr {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new fr(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, s = !1, i = -1;
    typeof navigator < "u" && (n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, s = navigator.userAgent.indexOf("Firefox") > -1, i = s ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || n || s && i < 98 ? this.textureLoader = new Cs(this.options.manager) : this.textureLoader = new Ls(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new It(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const n = this, s = this.json, i = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(r) {
      return r._markDefs && r._markDefs();
    }), Promise.all(this._invokeAll(function(r) {
      return r.beforeRoot && r.beforeRoot();
    })).then(function() {
      return Promise.all([
        n.getDependencies("scene"),
        n.getDependencies("animation"),
        n.getDependencies("camera")
      ]);
    }).then(function(r) {
      const a = {
        scene: r[0][s.scene || 0],
        scenes: r[0],
        animations: r[1],
        cameras: r[2],
        asset: s.asset,
        parser: n,
        userData: {}
      };
      ht(i, a, s), Be(a, s), Promise.all(n._invokeAll(function(c) {
        return c.afterRoot && c.afterRoot(a);
      })).then(function() {
        e(a);
      });
    }).catch(t);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || [];
    for (let s = 0, i = t.length; s < i; s++) {
      const r = t[s].joints;
      for (let a = 0, c = r.length; a < c; a++)
        e[r[a]].isBone = !0;
    }
    for (let s = 0, i = e.length; s < i; s++) {
      const r = e[s];
      r.mesh !== void 0 && (this._addNodeRef(this.meshCache, r.mesh), r.skin !== void 0 && (n[r.mesh].isSkinnedMesh = !0)), r.camera !== void 0 && this._addNodeRef(this.cameraCache, r.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(e, t, n) {
    if (e.refs[t] <= 1)
      return n;
    const s = n.clone(), i = (r, a) => {
      const c = this.associations.get(r);
      c != null && this.associations.set(a, c);
      for (const [h, d] of r.children.entries())
        i(d, a.children[h]);
    };
    return i(n, s), s.name += "_instance_" + e.uses[t]++, s;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let n = 0; n < t.length; n++) {
      const s = e(t[n]);
      if (s)
        return s;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const n = [];
    for (let s = 0; s < t.length; s++) {
      const i = e(t[s]);
      i && n.push(i);
    }
    return n;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(e, t) {
    const n = e + ":" + t;
    let s = this.cache.get(n);
    if (!s) {
      switch (e) {
        case "scene":
          s = this.loadScene(t);
          break;
        case "node":
          s = this._invokeOne(function(i) {
            return i.loadNode && i.loadNode(t);
          });
          break;
        case "mesh":
          s = this._invokeOne(function(i) {
            return i.loadMesh && i.loadMesh(t);
          });
          break;
        case "accessor":
          s = this.loadAccessor(t);
          break;
        case "bufferView":
          s = this._invokeOne(function(i) {
            return i.loadBufferView && i.loadBufferView(t);
          });
          break;
        case "buffer":
          s = this.loadBuffer(t);
          break;
        case "material":
          s = this._invokeOne(function(i) {
            return i.loadMaterial && i.loadMaterial(t);
          });
          break;
        case "texture":
          s = this._invokeOne(function(i) {
            return i.loadTexture && i.loadTexture(t);
          });
          break;
        case "skin":
          s = this.loadSkin(t);
          break;
        case "animation":
          s = this._invokeOne(function(i) {
            return i.loadAnimation && i.loadAnimation(t);
          });
          break;
        case "camera":
          s = this.loadCamera(t);
          break;
        default:
          if (s = this._invokeOne(function(i) {
            return i != this && i.getDependency && i.getDependency(e, t);
          }), !s)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(n, s);
    }
    return s;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const n = this, s = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(s.map(function(i, r) {
        return n.getDependency(e, r);
      })), this.cache.add(e, t);
    }
    return t;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(e) {
    const t = this.json.buffers[e], n = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[J.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(i, r) {
      n.load(qt.resolveURL(t.uri, s.path), i, void 0, function() {
        r(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(n) {
      const s = t.byteLength || 0, i = t.byteOffset || 0;
      return n.slice(i, i + s);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const t = this, n = this.json, s = this.json.accessors[e];
    if (s.bufferView === void 0 && s.sparse === void 0) {
      const r = Kt[s.type], a = Je[s.componentType], c = s.normalized === !0, h = new a(s.count * r);
      return Promise.resolve(new xt(h, r, c));
    }
    const i = [];
    return s.bufferView !== void 0 ? i.push(this.getDependency("bufferView", s.bufferView)) : i.push(null), s.sparse !== void 0 && (i.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(i).then(function(r) {
      const a = r[0], c = Kt[s.type], h = Je[s.componentType], d = h.BYTES_PER_ELEMENT, f = d * c, m = s.byteOffset || 0, T = s.bufferView !== void 0 ? n.bufferViews[s.bufferView].byteStride : void 0, U = s.normalized === !0;
      let B, M;
      if (T && T !== f) {
        const N = Math.floor(m / T), Z = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + N + ":" + s.count;
        let R = t.cache.get(Z);
        R || (B = new h(a, N * T, s.count * T / d), R = new Ns(B, T / d), t.cache.add(Z, R)), M = new Ds(R, c, m % T / d, U);
      } else
        a === null ? B = new h(s.count * c) : B = new h(a, m, s.count * c), M = new xt(B, c, U);
      if (s.sparse !== void 0) {
        const N = Kt.SCALAR, Z = Je[s.sparse.indices.componentType], R = s.sparse.indices.byteOffset || 0, L = s.sparse.values.byteOffset || 0, W = new Z(r[1], R, s.sparse.count * N), H = new h(r[2], L, s.sparse.count * c);
        a !== null && (M = new xt(M.array.slice(), M.itemSize, M.normalized));
        for (let z = 0, b = W.length; z < b; z++) {
          const A = W[z];
          if (M.setX(A, H[z * c]), c >= 2 && M.setY(A, H[z * c + 1]), c >= 3 && M.setZ(A, H[z * c + 2]), c >= 4 && M.setW(A, H[z * c + 3]), c >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return M;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(e) {
    const t = this.json, n = this.options, i = t.textures[e].source, r = t.images[i];
    let a = this.textureLoader;
    if (r.uri) {
      const c = n.manager.getHandler(r.uri);
      c !== null && (a = c);
    }
    return this.loadTextureImage(e, i, a);
  }
  loadTextureImage(e, t, n) {
    const s = this, i = this.json, r = i.textures[e], a = i.images[t], c = (a.uri || a.bufferView) + ":" + r.sampler;
    if (this.textureCache[c])
      return this.textureCache[c];
    const h = this.loadImageSource(t, n).then(function(d) {
      d.flipY = !1, d.name = r.name || a.name || "";
      const m = (i.samplers || {})[r.sampler] || {};
      return d.magFilter = An[m.magFilter] || $e, d.minFilter = An[m.minFilter] || Nn, d.wrapS = wn[m.wrapS] || Jt, d.wrapT = wn[m.wrapT] || Jt, s.associations.set(d, { textures: e }), d;
    }).catch(function() {
      return null;
    });
    return this.textureCache[c] = h, h;
  }
  loadImageSource(e, t) {
    const n = this, s = this.json, i = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((f) => f.clone());
    const r = s.images[e], a = self.URL || self.webkitURL;
    let c = r.uri || "", h = !1;
    if (r.bufferView !== void 0)
      c = n.getDependency("bufferView", r.bufferView).then(function(f) {
        h = !0;
        const m = new Blob([f], { type: r.mimeType });
        return c = a.createObjectURL(m), c;
      });
    else if (r.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const d = Promise.resolve(c).then(function(f) {
      return new Promise(function(m, T) {
        let U = m;
        t.isImageBitmapLoader === !0 && (U = function(B) {
          const M = new mn(B);
          M.needsUpdate = !0, m(M);
        }), t.load(qt.resolveURL(f, i.path), U, void 0, T);
      });
    }).then(function(f) {
      return h === !0 && a.revokeObjectURL(c), f.userData.mimeType = r.mimeType || Hr(r.uri), f;
    }).catch(function(f) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", c), f;
    });
    return this.sourceCache[e] = d, d;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(e, t, n, s) {
    const i = this;
    return this.getDependency("texture", n.index).then(function(r) {
      if (!r)
        return null;
      if (n.texCoord !== void 0 && n.texCoord != 0 && !(t === "aoMap" && n.texCoord == 1) && console.warn("THREE.GLTFLoader: Custom UV set " + n.texCoord + " for texture " + t + " not yet supported."), i.extensions[J.KHR_TEXTURE_TRANSFORM]) {
        const a = n.extensions !== void 0 ? n.extensions[J.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const c = i.associations.get(r);
          r = i.extensions[J.KHR_TEXTURE_TRANSFORM].extendTexture(r, a), i.associations.set(r, c);
        }
      }
      return s !== void 0 && (r.encoding = s), e[t] = r, r;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(e) {
    const t = e.geometry;
    let n = e.material;
    const s = t.attributes.tangent === void 0, i = t.attributes.color !== void 0, r = t.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + n.uuid;
      let c = this.cache.get(a);
      c || (c = new ks(), Zt.prototype.copy.call(c, n), c.color.copy(n.color), c.map = n.map, c.sizeAttenuation = !1, this.cache.add(a, c)), n = c;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + n.uuid;
      let c = this.cache.get(a);
      c || (c = new Os(), Zt.prototype.copy.call(c, n), c.color.copy(n.color), this.cache.add(a, c)), n = c;
    }
    if (s || i || r) {
      let a = "ClonedMaterial:" + n.uuid + ":";
      s && (a += "derivative-tangents:"), i && (a += "vertex-colors:"), r && (a += "flat-shading:");
      let c = this.cache.get(a);
      c || (c = n.clone(), i && (c.vertexColors = !0), r && (c.flatShading = !0), s && (c.normalScale && (c.normalScale.y *= -1), c.clearcoatNormalScale && (c.clearcoatNormalScale.y *= -1)), this.cache.add(a, c), this.associations.set(c, this.associations.get(n))), n = c;
    }
    n.aoMap && t.attributes.uv2 === void 0 && t.attributes.uv !== void 0 && t.setAttribute("uv2", t.attributes.uv), e.material = n;
  }
  getMaterialType() {
    return Dn;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, n = this.json, s = this.extensions, i = n.materials[e];
    let r;
    const a = {}, c = i.extensions || {}, h = [];
    if (c[J.KHR_MATERIALS_UNLIT]) {
      const f = s[J.KHR_MATERIALS_UNLIT];
      r = f.getMaterialType(), h.push(f.extendParams(a, i, t));
    } else {
      const f = i.pbrMetallicRoughness || {};
      if (a.color = new Me(1, 1, 1), a.opacity = 1, Array.isArray(f.baseColorFactor)) {
        const m = f.baseColorFactor;
        a.color.fromArray(m), a.opacity = m[3];
      }
      f.baseColorTexture !== void 0 && h.push(t.assignTexture(a, "map", f.baseColorTexture, dt)), a.metalness = f.metallicFactor !== void 0 ? f.metallicFactor : 1, a.roughness = f.roughnessFactor !== void 0 ? f.roughnessFactor : 1, f.metallicRoughnessTexture !== void 0 && (h.push(t.assignTexture(a, "metalnessMap", f.metallicRoughnessTexture)), h.push(t.assignTexture(a, "roughnessMap", f.metallicRoughnessTexture))), r = this._invokeOne(function(m) {
        return m.getMaterialType && m.getMaterialType(e);
      }), h.push(Promise.all(this._invokeAll(function(m) {
        return m.extendMaterialParams && m.extendMaterialParams(e, a);
      })));
    }
    i.doubleSided === !0 && (a.side = Us);
    const d = i.alphaMode || Vt.OPAQUE;
    if (d === Vt.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, d === Vt.MASK && (a.alphaTest = i.alphaCutoff !== void 0 ? i.alphaCutoff : 0.5)), i.normalTexture !== void 0 && r !== We && (h.push(t.assignTexture(a, "normalMap", i.normalTexture)), a.normalScale = new Re(1, 1), i.normalTexture.scale !== void 0)) {
      const f = i.normalTexture.scale;
      a.normalScale.set(f, f);
    }
    return i.occlusionTexture !== void 0 && r !== We && (h.push(t.assignTexture(a, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && r !== We && (a.emissive = new Me().fromArray(i.emissiveFactor)), i.emissiveTexture !== void 0 && r !== We && h.push(t.assignTexture(a, "emissiveMap", i.emissiveTexture, dt)), Promise.all(h).then(function() {
      const f = new r(a);
      return i.name && (f.name = i.name), Be(f, i), t.associations.set(f, { materials: e }), i.extensions && ht(s, f, i), f;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(e) {
    const t = Ps.sanitizeNodeName(e || "");
    let n = t;
    for (let s = 1; this.nodeNamesUsed[n]; ++s)
      n = t + "_" + s;
    return this.nodeNamesUsed[n] = !0, n;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(e) {
    const t = this, n = this.extensions, s = this.primitiveCache;
    function i(a) {
      return n[J.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(c) {
        return En(c, a, t);
      });
    }
    const r = [];
    for (let a = 0, c = e.length; a < c; a++) {
      const h = e[a], d = Br(h), f = s[d];
      if (f)
        r.push(f.promise);
      else {
        let m;
        h.extensions && h.extensions[J.KHR_DRACO_MESH_COMPRESSION] ? m = i(h) : m = En(new on(), h, t), s[d] = { primitive: h, promise: m }, r.push(m);
      }
    }
    return Promise.all(r);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(e) {
    const t = this, n = this.json, s = this.extensions, i = n.meshes[e], r = i.primitives, a = [];
    for (let c = 0, h = r.length; c < h; c++) {
      const d = r[c].material === void 0 ? Ur(this.cache) : this.getDependency("material", r[c].material);
      a.push(d);
    }
    return a.push(t.loadGeometries(r)), Promise.all(a).then(function(c) {
      const h = c.slice(0, c.length - 1), d = c[c.length - 1], f = [];
      for (let T = 0, U = d.length; T < U; T++) {
        const B = d[T], M = r[T];
        let N;
        const Z = h[T];
        if (M.mode === ve.TRIANGLES || M.mode === ve.TRIANGLE_STRIP || M.mode === ve.TRIANGLE_FAN || M.mode === void 0)
          N = i.isSkinnedMesh === !0 ? new Fs(B, Z) : new kn(B, Z), N.isSkinnedMesh === !0 && N.normalizeSkinWeights(), M.mode === ve.TRIANGLE_STRIP ? N.geometry = bn(N.geometry, In) : M.mode === ve.TRIANGLE_FAN && (N.geometry = bn(N.geometry, Qt));
        else if (M.mode === ve.LINES)
          N = new Bs(B, Z);
        else if (M.mode === ve.LINE_STRIP)
          N = new Hs(B, Z);
        else if (M.mode === ve.LINE_LOOP)
          N = new Gs(B, Z);
        else if (M.mode === ve.POINTS)
          N = new zs(B, Z);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + M.mode);
        Object.keys(N.geometry.morphAttributes).length > 0 && Fr(N, i), N.name = t.createUniqueName(i.name || "mesh_" + e), Be(N, i), M.extensions && ht(s, N, M), t.assignFinalMaterial(N), f.push(N);
      }
      for (let T = 0, U = f.length; T < U; T++)
        t.associations.set(f[T], {
          meshes: e,
          primitives: T
        });
      if (f.length === 1)
        return f[0];
      const m = new jt();
      t.associations.set(m, { meshes: e });
      for (let T = 0, U = f.length; T < U; T++)
        m.add(f[T]);
      return m;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(e) {
    let t;
    const n = this.json.cameras[e], s = n[n.type];
    if (!s) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return n.type === "perspective" ? t = new Zs(js.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : n.type === "orthographic" && (t = new On(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), n.name && (t.name = this.createUniqueName(n.name)), Be(t, n), Promise.resolve(t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const t = this.json.skins[e], n = [];
    for (let s = 0, i = t.joints.length; s < i; s++)
      n.push(this._loadNodeShallow(t.joints[s]));
    return t.inverseBindMatrices !== void 0 ? n.push(this.getDependency("accessor", t.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function(s) {
      const i = s.pop(), r = s, a = [], c = [];
      for (let h = 0, d = r.length; h < d; h++) {
        const f = r[h];
        if (f) {
          a.push(f);
          const m = new Mt();
          i !== null && m.fromArray(i.array, h * 16), c.push(m);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[h]);
      }
      return new Ks(a, c);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const n = this.json.animations[e], s = [], i = [], r = [], a = [], c = [];
    for (let h = 0, d = n.channels.length; h < d; h++) {
      const f = n.channels[h], m = n.samplers[f.sampler], T = f.target, U = T.node, B = n.parameters !== void 0 ? n.parameters[m.input] : m.input, M = n.parameters !== void 0 ? n.parameters[m.output] : m.output;
      s.push(this.getDependency("node", U)), i.push(this.getDependency("accessor", B)), r.push(this.getDependency("accessor", M)), a.push(m), c.push(T);
    }
    return Promise.all([
      Promise.all(s),
      Promise.all(i),
      Promise.all(r),
      Promise.all(a),
      Promise.all(c)
    ]).then(function(h) {
      const d = h[0], f = h[1], m = h[2], T = h[3], U = h[4], B = [];
      for (let N = 0, Z = d.length; N < Z; N++) {
        const R = d[N], L = f[N], W = m[N], H = T[N], z = U[N];
        if (R === void 0)
          continue;
        R.updateMatrix();
        let b;
        switch (Pe[z.path]) {
          case Pe.weights:
            b = sr;
            break;
          case Pe.rotation:
            b = gn;
            break;
          case Pe.position:
          case Pe.scale:
          default:
            b = nr;
            break;
        }
        const A = R.name ? R.name : R.uuid, j = H.interpolation !== void 0 ? Or[H.interpolation] : Un, P = [];
        Pe[z.path] === Pe.weights ? R.traverse(function(te) {
          te.morphTargetInfluences && P.push(te.name ? te.name : te.uuid);
        }) : P.push(A);
        let G = W.array;
        if (W.normalized) {
          const te = nn(G.constructor), re = new Float32Array(G.length);
          for (let ne = 0, se = G.length; ne < se; ne++)
            re[ne] = G[ne] * te;
          G = re;
        }
        for (let te = 0, re = P.length; te < re; te++) {
          const ne = new b(
            P[te] + "." + Pe[z.path],
            L.array,
            G,
            j
          );
          H.interpolation === "CUBICSPLINE" && (ne.createInterpolant = function(de) {
            const pe = this instanceof gn ? kr : Hn;
            return new pe(this.times, this.values, this.getValueSize() / 3, de);
          }, ne.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0), B.push(ne);
        }
      }
      const M = n.name ? n.name : "animation_" + e;
      return new Vs(M, void 0, B);
    });
  }
  createNodeMesh(e) {
    const t = this.json, n = this, s = t.nodes[e];
    return s.mesh === void 0 ? null : n.getDependency("mesh", s.mesh).then(function(i) {
      const r = n._getNodeRef(n.meshCache, s.mesh, i);
      return s.weights !== void 0 && r.traverse(function(a) {
        if (a.isMesh)
          for (let c = 0, h = s.weights.length; c < h; c++)
            a.morphTargetInfluences[c] = s.weights[c];
      }), r;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(e) {
    const t = this.json, n = this, s = t.nodes[e], i = n._loadNodeShallow(e), r = [], a = s.children || [];
    for (let h = 0, d = a.length; h < d; h++)
      r.push(n.getDependency("node", a[h]));
    const c = s.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", s.skin);
    return Promise.all([
      i,
      Promise.all(r),
      c
    ]).then(function(h) {
      const d = h[0], f = h[1], m = h[2];
      m !== null && d.traverse(function(T) {
        T.isSkinnedMesh && T.bind(m, Gr);
      });
      for (let T = 0, U = f.length; T < U; T++)
        d.add(f[T]);
      return d;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, n = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const i = t.nodes[e], r = i.name ? s.createUniqueName(i.name) : "", a = [], c = s._invokeOne(function(h) {
      return h.createNodeMesh && h.createNodeMesh(e);
    });
    return c && a.push(c), i.camera !== void 0 && a.push(s.getDependency("camera", i.camera).then(function(h) {
      return s._getNodeRef(s.cameraCache, i.camera, h);
    })), s._invokeAll(function(h) {
      return h.createNodeAttachment && h.createNodeAttachment(e);
    }).forEach(function(h) {
      a.push(h);
    }), this.nodeCache[e] = Promise.all(a).then(function(h) {
      let d;
      if (i.isBone === !0 ? d = new Xs() : h.length > 1 ? d = new jt() : h.length === 1 ? d = h[0] : d = new Ln(), d !== h[0])
        for (let f = 0, m = h.length; f < m; f++)
          d.add(h[f]);
      if (i.name && (d.userData.name = i.name, d.name = r), Be(d, i), i.extensions && ht(n, d, i), i.matrix !== void 0) {
        const f = new Mt();
        f.fromArray(i.matrix), d.applyMatrix4(f);
      } else
        i.translation !== void 0 && d.position.fromArray(i.translation), i.rotation !== void 0 && d.quaternion.fromArray(i.rotation), i.scale !== void 0 && d.scale.fromArray(i.scale);
      return s.associations.has(d) || s.associations.set(d, {}), s.associations.get(d).nodes = e, d;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const t = this.extensions, n = this.json.scenes[e], s = this, i = new jt();
    n.name && (i.name = s.createUniqueName(n.name)), Be(i, n), n.extensions && ht(t, i, n);
    const r = n.nodes || [], a = [];
    for (let c = 0, h = r.length; c < h; c++)
      a.push(s.getDependency("node", r[c]));
    return Promise.all(a).then(function(c) {
      for (let d = 0, f = c.length; d < f; d++)
        i.add(c[d]);
      const h = (d) => {
        const f = /* @__PURE__ */ new Map();
        for (const [m, T] of s.associations)
          (m instanceof Zt || m instanceof mn) && f.set(m, T);
        return d.traverse((m) => {
          const T = s.associations.get(m);
          T != null && f.set(m, T);
        }), f;
      };
      return s.associations = h(i), i;
    });
  }
}
function Zr(u, e, t) {
  const n = e.attributes, s = new rr();
  if (n.POSITION !== void 0) {
    const a = t.json.accessors[n.POSITION], c = a.min, h = a.max;
    if (c !== void 0 && h !== void 0) {
      if (s.set(
        new Le(c[0], c[1], c[2]),
        new Le(h[0], h[1], h[2])
      ), a.normalized) {
        const d = nn(Je[a.componentType]);
        s.min.multiplyScalar(d), s.max.multiplyScalar(d);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const i = e.targets;
  if (i !== void 0) {
    const a = new Le(), c = new Le();
    for (let h = 0, d = i.length; h < d; h++) {
      const f = i[h];
      if (f.POSITION !== void 0) {
        const m = t.json.accessors[f.POSITION], T = m.min, U = m.max;
        if (T !== void 0 && U !== void 0) {
          if (c.setX(Math.max(Math.abs(T[0]), Math.abs(U[0]))), c.setY(Math.max(Math.abs(T[1]), Math.abs(U[1]))), c.setZ(Math.max(Math.abs(T[2]), Math.abs(U[2]))), m.normalized) {
            const B = nn(Je[m.componentType]);
            c.multiplyScalar(B);
          }
          a.max(c);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    s.expandByVector(a);
  }
  u.boundingBox = s;
  const r = new ir();
  s.getCenter(r.center), r.radius = s.min.distanceTo(s.max) / 2, u.boundingSphere = r;
}
function En(u, e, t) {
  const n = e.attributes, s = [];
  function i(r, a) {
    return t.getDependency("accessor", r).then(function(c) {
      u.setAttribute(a, c);
    });
  }
  for (const r in n) {
    const a = tn[r] || r.toLowerCase();
    a in u.attributes || s.push(i(n[r], a));
  }
  if (e.indices !== void 0 && !u.index) {
    const r = t.getDependency("accessor", e.indices).then(function(a) {
      u.setIndex(a);
    });
    s.push(r);
  }
  return Be(u, e), Zr(u, e, t), Promise.all(s).then(function() {
    return e.targets !== void 0 ? Pr(u, e.targets, t) : u;
  });
}
const Xt = /* @__PURE__ */ new WeakMap();
class jr extends Mn {
  constructor(e) {
    super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  setDecoderPath(e) {
    return this.decoderPath = e, this;
  }
  setDecoderConfig(e) {
    return this.decoderConfig = e, this;
  }
  setWorkerLimit(e) {
    return this.workerLimit = e, this;
  }
  load(e, t, n, s) {
    const i = new It(this.manager);
    i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(e, (r) => {
      this.parse(r, t, s);
    }, n, s);
  }
  parse(e, t, n) {
    this.decodeDracoFile(e, t, null, null, _n).catch(n);
  }
  decodeDracoFile(e, t, n, s, i = ar) {
    const r = {
      attributeIDs: n || this.defaultAttributeIDs,
      attributeTypes: s || this.defaultAttributeTypes,
      useUniqueIDs: !!n,
      vertexColorSpace: i
    };
    return this.decodeGeometry(e, r).then(t);
  }
  decodeGeometry(e, t) {
    const n = JSON.stringify(t);
    if (Xt.has(e)) {
      const c = Xt.get(e);
      if (c.key === n)
        return c.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let s;
    const i = this.workerNextTaskID++, r = e.byteLength, a = this._getWorker(i, r).then((c) => (s = c, new Promise((h, d) => {
      s._callbacks[i] = { resolve: h, reject: d }, s.postMessage({ type: "decode", id: i, taskConfig: t, buffer: e }, [e]);
    }))).then((c) => this._createGeometry(c.geometry));
    return a.catch(() => !0).then(() => {
      s && i && this._releaseTask(s, i);
    }), Xt.set(e, {
      key: n,
      promise: a
    }), a;
  }
  _createGeometry(e) {
    const t = new on();
    e.index && t.setIndex(new xt(e.index.array, 1));
    for (let n = 0; n < e.attributes.length; n++) {
      const s = e.attributes[n], i = s.name, r = s.array, a = s.itemSize, c = new xt(r, a);
      i === "color" && this._assignVertexColorSpace(c, s.vertexColorSpace), t.setAttribute(i, c);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== _n)
      return;
    const n = new Me();
    for (let s = 0, i = e.count; s < i; s++)
      n.fromBufferAttribute(e, s).convertSRGBToLinear(), e.setXYZ(s, n.r, n.g, n.b);
  }
  _loadLibrary(e, t) {
    const n = new It(this.manager);
    return n.setPath(this.decoderPath), n.setResponseType(t), n.setWithCredentials(this.withCredentials), new Promise((s, i) => {
      n.load(e, s, void 0, i);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending)
      return this.decoderPending;
    const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", t = [];
    return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then((n) => {
      const s = n[0];
      e || (this.decoderConfig.wasmBinary = n[1]);
      const i = Kr.toString(), r = [
        "/* draco decoder */",
        s,
        "",
        "/* worker */",
        i.substring(i.indexOf("{") + 1, i.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([r]));
    }), this.decoderPending;
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const s = new Worker(this.workerSourceURL);
        s._callbacks = {}, s._taskCosts = {}, s._taskLoad = 0, s.postMessage({ type: "init", decoderConfig: this.decoderConfig }), s.onmessage = function(i) {
          const r = i.data;
          switch (r.type) {
            case "decode":
              s._callbacks[r.id].resolve(r);
              break;
            case "error":
              s._callbacks[r.id].reject(r);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + r.type + '"');
          }
        }, this.workerPool.push(s);
      } else
        this.workerPool.sort(function(s, i) {
          return s._taskLoad > i._taskLoad ? -1 : 1;
        });
      const n = this.workerPool[this.workerPool.length - 1];
      return n._taskCosts[e] = t, n._taskLoad += t, n;
    });
  }
  _releaseTask(e, t) {
    e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((e) => e._taskLoad));
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e)
      this.workerPool[e].terminate();
    return this.workerPool.length = 0, this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL), this;
  }
}
function Kr() {
  let u, e;
  onmessage = function(r) {
    const a = r.data;
    switch (a.type) {
      case "init":
        u = a.decoderConfig, e = new Promise(function(d) {
          u.onModuleLoaded = function(f) {
            d({ draco: f });
          }, DracoDecoderModule(u);
        });
        break;
      case "decode":
        const c = a.buffer, h = a.taskConfig;
        e.then((d) => {
          const f = d.draco, m = new f.Decoder();
          try {
            const T = t(f, m, new Int8Array(c), h), U = T.attributes.map((B) => B.array.buffer);
            T.index && U.push(T.index.array.buffer), self.postMessage({ type: "decode", id: a.id, geometry: T }, U);
          } catch (T) {
            console.error(T), self.postMessage({ type: "error", id: a.id, error: T.message });
          } finally {
            f.destroy(m);
          }
        });
        break;
    }
  };
  function t(r, a, c, h) {
    const d = h.attributeIDs, f = h.attributeTypes;
    let m, T;
    const U = a.GetEncodedGeometryType(c);
    if (U === r.TRIANGULAR_MESH)
      m = new r.Mesh(), T = a.DecodeArrayToMesh(c, c.byteLength, m);
    else if (U === r.POINT_CLOUD)
      m = new r.PointCloud(), T = a.DecodeArrayToPointCloud(c, c.byteLength, m);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!T.ok() || m.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + T.error_msg());
    const B = { index: null, attributes: [] };
    for (const M in d) {
      const N = self[f[M]];
      let Z, R;
      if (h.useUniqueIDs)
        R = d[M], Z = a.GetAttributeByUniqueId(m, R);
      else {
        if (R = a.GetAttributeId(m, r[d[M]]), R === -1)
          continue;
        Z = a.GetAttribute(m, R);
      }
      const L = s(r, a, m, M, N, Z);
      M === "color" && (L.vertexColorSpace = h.vertexColorSpace), B.attributes.push(L);
    }
    return U === r.TRIANGULAR_MESH && (B.index = n(r, a, m)), r.destroy(m), B;
  }
  function n(r, a, c) {
    const d = c.num_faces() * 3, f = d * 4, m = r._malloc(f);
    a.GetTrianglesUInt32Array(c, f, m);
    const T = new Uint32Array(r.HEAPF32.buffer, m, d).slice();
    return r._free(m), { array: T, itemSize: 1 };
  }
  function s(r, a, c, h, d, f) {
    const m = f.num_components(), U = c.num_points() * m, B = U * d.BYTES_PER_ELEMENT, M = i(r, d), N = r._malloc(B);
    a.GetAttributeDataArrayForAllPoints(c, f, M, B, N);
    const Z = new d(r.HEAPF32.buffer, N, U).slice();
    return r._free(N), {
      name: h,
      array: Z,
      itemSize: m
    };
  }
  function i(r, a) {
    switch (a) {
      case Float32Array:
        return r.DT_FLOAT32;
      case Int8Array:
        return r.DT_INT8;
      case Int16Array:
        return r.DT_INT16;
      case Int32Array:
        return r.DT_INT32;
      case Uint8Array:
        return r.DT_UINT8;
      case Uint16Array:
        return r.DT_UINT16;
      case Uint32Array:
        return r.DT_UINT32;
    }
  }
}
class Vr extends Pn {
  constructor(e) {
    super(e), this.type = He;
  }
  // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
  parse(e) {
    const a = function(R, L) {
      switch (R) {
        case 1:
          console.error("THREE.RGBELoader Read Error: " + (L || ""));
          break;
        case 2:
          console.error("THREE.RGBELoader Write Error: " + (L || ""));
          break;
        case 3:
          console.error("THREE.RGBELoader Bad File Format: " + (L || ""));
          break;
        default:
        case 4:
          console.error("THREE.RGBELoader: Error: " + (L || ""));
      }
      return -1;
    }, f = `
`, m = function(R, L, W) {
      L = L || 1024;
      let z = R.pos, b = -1, A = 0, j = "", P = String.fromCharCode.apply(null, new Uint16Array(R.subarray(z, z + 128)));
      for (; 0 > (b = P.indexOf(f)) && A < L && z < R.byteLength; )
        j += P, A += P.length, z += 128, P += String.fromCharCode.apply(null, new Uint16Array(R.subarray(z, z + 128)));
      return -1 < b ? (W !== !1 && (R.pos += A + b + 1), j + P.slice(0, b)) : !1;
    }, T = function(R) {
      const L = /^#\?(\S+)/, W = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, H = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, z = /^\s*FORMAT=(\S+)\s*$/, b = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, A = {
        valid: 0,
        /* indicate which fields are valid */
        string: "",
        /* the actual header string */
        comments: "",
        /* comments found in header */
        programtype: "RGBE",
        /* listed at beginning of file to identify it after "#?". defaults to "RGBE" */
        format: "",
        /* RGBE format, default 32-bit_rle_rgbe */
        gamma: 1,
        /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */
        exposure: 1,
        /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */
        width: 0,
        height: 0
        /* image dimensions, width/height */
      };
      let j, P;
      if (R.pos >= R.byteLength || !(j = m(R)))
        return a(1, "no header found");
      if (!(P = j.match(L)))
        return a(3, "bad initial token");
      for (A.valid |= 1, A.programtype = P[1], A.string += j + `
`; j = m(R), j !== !1; ) {
        if (A.string += j + `
`, j.charAt(0) === "#") {
          A.comments += j + `
`;
          continue;
        }
        if ((P = j.match(W)) && (A.gamma = parseFloat(P[1])), (P = j.match(H)) && (A.exposure = parseFloat(P[1])), (P = j.match(z)) && (A.valid |= 2, A.format = P[1]), (P = j.match(b)) && (A.valid |= 4, A.height = parseInt(P[1], 10), A.width = parseInt(P[2], 10)), A.valid & 2 && A.valid & 4)
          break;
      }
      return A.valid & 2 ? A.valid & 4 ? A : a(3, "missing image size specifier") : a(3, "missing format specifier");
    }, U = function(R, L, W) {
      const H = L;
      if (
        // run length encoding is not allowed so read flat
        H < 8 || H > 32767 || // this file is not run length encoded
        R[0] !== 2 || R[1] !== 2 || R[2] & 128
      )
        return new Uint8Array(R);
      if (H !== (R[2] << 8 | R[3]))
        return a(3, "wrong scanline width");
      const z = new Uint8Array(4 * L * W);
      if (!z.length)
        return a(4, "unable to allocate buffer space");
      let b = 0, A = 0;
      const j = 4 * H, P = new Uint8Array(4), G = new Uint8Array(j);
      let te = W;
      for (; te > 0 && A < R.byteLength; ) {
        if (A + 4 > R.byteLength)
          return a(1);
        if (P[0] = R[A++], P[1] = R[A++], P[2] = R[A++], P[3] = R[A++], P[0] != 2 || P[1] != 2 || (P[2] << 8 | P[3]) != H)
          return a(3, "bad rgbe scanline format");
        let re = 0, ne;
        for (; re < j && A < R.byteLength; ) {
          ne = R[A++];
          const de = ne > 128;
          if (de && (ne -= 128), ne === 0 || re + ne > j)
            return a(3, "bad scanline data");
          if (de) {
            const pe = R[A++];
            for (let Ue = 0; Ue < ne; Ue++)
              G[re++] = pe;
          } else
            G.set(R.subarray(A, A + ne), re), re += ne, A += ne;
        }
        const se = H;
        for (let de = 0; de < se; de++) {
          let pe = 0;
          z[b] = G[de + pe], pe += H, z[b + 1] = G[de + pe], pe += H, z[b + 2] = G[de + pe], pe += H, z[b + 3] = G[de + pe], b += 4;
        }
        te--;
      }
      return z;
    }, B = function(R, L, W, H) {
      const z = R[L + 3], b = Math.pow(2, z - 128) / 255;
      W[H + 0] = R[L + 0] * b, W[H + 1] = R[L + 1] * b, W[H + 2] = R[L + 2] * b, W[H + 3] = 1;
    }, M = function(R, L, W, H) {
      const z = R[L + 3], b = Math.pow(2, z - 128) / 255;
      W[H + 0] = Ye.toHalfFloat(Math.min(R[L + 0] * b, 65504)), W[H + 1] = Ye.toHalfFloat(Math.min(R[L + 1] * b, 65504)), W[H + 2] = Ye.toHalfFloat(Math.min(R[L + 2] * b, 65504)), W[H + 3] = Ye.toHalfFloat(1);
    }, N = new Uint8Array(e);
    N.pos = 0;
    const Z = T(N);
    if (Z !== -1) {
      const R = Z.width, L = Z.height, W = U(N.subarray(N.pos), R, L);
      if (W !== -1) {
        let H, z, b;
        switch (this.type) {
          case qe:
            b = W.length / 4;
            const A = new Float32Array(b * 4);
            for (let P = 0; P < b; P++)
              B(W, P * 4, A, P * 4);
            H = A, z = qe;
            break;
          case He:
            b = W.length / 4;
            const j = new Uint16Array(b * 4);
            for (let P = 0; P < b; P++)
              M(W, P * 4, j, P * 4);
            H = j, z = He;
            break;
          default:
            console.error("THREE.RGBELoader: unsupported type: ", this.type);
            break;
        }
        return {
          width: R,
          height: L,
          data: H,
          header: Z.string,
          gamma: Z.gamma,
          exposure: Z.exposure,
          type: z
        };
      }
    }
    return null;
  }
  setDataType(e) {
    return this.type = e, this;
  }
  load(e, t, n, s) {
    function i(r, a) {
      switch (r.type) {
        case qe:
        case He:
          r.encoding = $t, r.minFilter = $e, r.magFilter = $e, r.generateMipmaps = !1, r.flipY = !0;
          break;
      }
      t && t(r, a);
    }
    return super.load(e, i, n, s);
  }
}
/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/
var Sn = function(u) {
  return URL.createObjectURL(new Blob([u], { type: "text/javascript" }));
};
try {
  URL.revokeObjectURL(Sn(""));
} catch {
  Sn = function(e) {
    return "data:application/javascript;charset=UTF-8," + encodeURI(e);
  };
}
var Ie = Uint8Array, Ge = Uint16Array, sn = Uint32Array, Gn = new Ie([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), zn = new Ie([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), Xr = new Ie([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Zn = function(u, e) {
  for (var t = new Ge(31), n = 0; n < 31; ++n)
    t[n] = e += 1 << u[n - 1];
  for (var s = new sn(t[30]), n = 1; n < 30; ++n)
    for (var i = t[n]; i < t[n + 1]; ++i)
      s[i] = i - t[n] << 5 | n;
  return [t, s];
}, jn = Zn(Gn, 2), Kn = jn[0], Wr = jn[1];
Kn[28] = 258, Wr[258] = 28;
var Yr = Zn(zn, 0), Qr = Yr[0], rn = new Ge(32768);
for (var le = 0; le < 32768; ++le) {
  var Fe = (le & 43690) >>> 1 | (le & 21845) << 1;
  Fe = (Fe & 52428) >>> 2 | (Fe & 13107) << 2, Fe = (Fe & 61680) >>> 4 | (Fe & 3855) << 4, rn[le] = ((Fe & 65280) >>> 8 | (Fe & 255) << 8) >>> 1;
}
var ft = function(u, e, t) {
  for (var n = u.length, s = 0, i = new Ge(e); s < n; ++s)
    ++i[u[s] - 1];
  var r = new Ge(e);
  for (s = 0; s < e; ++s)
    r[s] = r[s - 1] + i[s - 1] << 1;
  var a;
  if (t) {
    a = new Ge(1 << e);
    var c = 15 - e;
    for (s = 0; s < n; ++s)
      if (u[s])
        for (var h = s << 4 | u[s], d = e - u[s], f = r[u[s] - 1]++ << d, m = f | (1 << d) - 1; f <= m; ++f)
          a[rn[f] >>> c] = h;
  } else
    for (a = new Ge(n), s = 0; s < n; ++s)
      u[s] && (a[s] = rn[r[u[s] - 1]++] >>> 15 - u[s]);
  return a;
}, bt = new Ie(288);
for (var le = 0; le < 144; ++le)
  bt[le] = 8;
for (var le = 144; le < 256; ++le)
  bt[le] = 9;
for (var le = 256; le < 280; ++le)
  bt[le] = 7;
for (var le = 280; le < 288; ++le)
  bt[le] = 8;
var Vn = new Ie(32);
for (var le = 0; le < 32; ++le)
  Vn[le] = 5;
var qr = /* @__PURE__ */ ft(bt, 9, 1), Jr = /* @__PURE__ */ ft(Vn, 5, 1), Wt = function(u) {
  for (var e = u[0], t = 1; t < u.length; ++t)
    u[t] > e && (e = u[t]);
  return e;
}, Ce = function(u, e, t) {
  var n = e / 8 | 0;
  return (u[n] | u[n + 1] << 8) >> (e & 7) & t;
}, Yt = function(u, e) {
  var t = e / 8 | 0;
  return (u[t] | u[t + 1] << 8 | u[t + 2] << 16) >> (e & 7);
}, $r = function(u) {
  return (u / 8 | 0) + (u & 7 && 1);
}, ei = function(u, e, t) {
  (e == null || e < 0) && (e = 0), (t == null || t > u.length) && (t = u.length);
  var n = new (u instanceof Ge ? Ge : u instanceof sn ? sn : Ie)(t - e);
  return n.set(u.subarray(e, t)), n;
}, ti = function(u, e, t) {
  var n = u.length;
  if (!n || t && !t.l && n < 5)
    return e || new Ie(0);
  var s = !e || t, i = !t || t.i;
  t || (t = {}), e || (e = new Ie(n * 3));
  var r = function(oe) {
    var De = e.length;
    if (oe > De) {
      var ke = new Ie(Math.max(De * 2, oe));
      ke.set(e), e = ke;
    }
  }, a = t.f || 0, c = t.p || 0, h = t.b || 0, d = t.l, f = t.d, m = t.m, T = t.n, U = n * 8;
  do {
    if (!d) {
      t.f = a = Ce(u, c, 1);
      var B = Ce(u, c + 1, 3);
      if (c += 3, B)
        if (B == 1)
          d = qr, f = Jr, m = 9, T = 5;
        else if (B == 2) {
          var R = Ce(u, c, 31) + 257, L = Ce(u, c + 10, 15) + 4, W = R + Ce(u, c + 5, 31) + 1;
          c += 14;
          for (var H = new Ie(W), z = new Ie(19), b = 0; b < L; ++b)
            z[Xr[b]] = Ce(u, c + b * 3, 7);
          c += L * 3;
          for (var A = Wt(z), j = (1 << A) - 1, P = ft(z, A, 1), b = 0; b < W; ) {
            var G = P[Ce(u, c, j)];
            c += G & 15;
            var M = G >>> 4;
            if (M < 16)
              H[b++] = M;
            else {
              var te = 0, re = 0;
              for (M == 16 ? (re = 3 + Ce(u, c, 3), c += 2, te = H[b - 1]) : M == 17 ? (re = 3 + Ce(u, c, 7), c += 3) : M == 18 && (re = 11 + Ce(u, c, 127), c += 7); re--; )
                H[b++] = te;
            }
          }
          var ne = H.subarray(0, R), se = H.subarray(R);
          m = Wt(ne), T = Wt(se), d = ft(ne, m, 1), f = ft(se, T, 1);
        } else
          throw "invalid block type";
      else {
        var M = $r(c) + 4, N = u[M - 4] | u[M - 3] << 8, Z = M + N;
        if (Z > n) {
          if (i)
            throw "unexpected EOF";
          break;
        }
        s && r(h + N), e.set(u.subarray(M, Z), h), t.b = h += N, t.p = c = Z * 8;
        continue;
      }
      if (c > U) {
        if (i)
          throw "unexpected EOF";
        break;
      }
    }
    s && r(h + 131072);
    for (var de = (1 << m) - 1, pe = (1 << T) - 1, Ue = c; ; Ue = c) {
      var te = d[Yt(u, c) & de], ge = te >>> 4;
      if (c += te & 15, c > U) {
        if (i)
          throw "unexpected EOF";
        break;
      }
      if (!te)
        throw "invalid length/literal";
      if (ge < 256)
        e[h++] = ge;
      else if (ge == 256) {
        Ue = c, d = null;
        break;
      } else {
        var Ke = ge - 254;
        if (ge > 264) {
          var b = ge - 257, be = Gn[b];
          Ke = Ce(u, c, (1 << be) - 1) + Kn[b], c += be;
        }
        var ze = f[Yt(u, c) & pe], Ze = ze >>> 4;
        if (!ze)
          throw "invalid distance";
        c += ze & 15;
        var se = Qr[Ze];
        if (Ze > 3) {
          var be = zn[Ze];
          se += Yt(u, c) & (1 << be) - 1, c += be;
        }
        if (c > U) {
          if (i)
            throw "unexpected EOF";
          break;
        }
        s && r(h + 131072);
        for (var st = h + Ke; h < st; h += 4)
          e[h] = e[h - se], e[h + 1] = e[h + 1 - se], e[h + 2] = e[h + 2 - se], e[h + 3] = e[h + 3 - se];
        h = st;
      }
    }
    t.l = d, t.p = Ue, t.b = h, d && (a = 1, t.m = m, t.d = f, t.n = T);
  } while (!a);
  return h == e.length ? e : ei(e, 0, h);
}, ni = /* @__PURE__ */ new Ie(0), si = function(u) {
  if ((u[0] & 15) != 8 || u[0] >>> 4 > 7 || (u[0] << 8 | u[1]) % 31)
    throw "invalid zlib data";
  if (u[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function St(u, e) {
  return ti((si(u), u.subarray(2, -4)), e);
}
var ri = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), ii = 0;
try {
  ri.decode(ni, { stream: !0 }), ii = 1;
} catch {
}
class oi extends Pn {
  constructor(e) {
    super(e), this.type = He;
  }
  parse(e) {
    const A = Math.pow(2.7182818, 2.2);
    function j(o, l) {
      let x = 0;
      for (let _ = 0; _ < 65536; ++_)
        (_ == 0 || o[_ >> 3] & 1 << (_ & 7)) && (l[x++] = _);
      const p = x - 1;
      for (; x < 65536; )
        l[x++] = 0;
      return p;
    }
    function P(o) {
      for (let l = 0; l < 16384; l++)
        o[l] = {}, o[l].len = 0, o[l].lit = 0, o[l].p = null;
    }
    const G = { l: 0, c: 0, lc: 0 };
    function te(o, l, x, p, _) {
      for (; x < o; )
        l = l << 8 | dn(p, _), x += 8;
      x -= o, G.l = l >> x & (1 << o) - 1, G.c = l, G.lc = x;
    }
    const re = new Array(59);
    function ne(o) {
      for (let x = 0; x <= 58; ++x)
        re[x] = 0;
      for (let x = 0; x < 65537; ++x)
        re[o[x]] += 1;
      let l = 0;
      for (let x = 58; x > 0; --x) {
        const p = l + re[x] >> 1;
        re[x] = l, l = p;
      }
      for (let x = 0; x < 65537; ++x) {
        const p = o[x];
        p > 0 && (o[x] = p | re[p]++ << 6);
      }
    }
    function se(o, l, x, p, _, g) {
      const y = l;
      let S = 0, v = 0;
      for (; p <= _; p++) {
        if (y.value - l.value > x)
          return !1;
        te(6, S, v, o, y);
        const w = G.l;
        if (S = G.c, v = G.lc, g[p] = w, w == 63) {
          if (y.value - l.value > x)
            throw new Error("Something wrong with hufUnpackEncTable");
          te(8, S, v, o, y);
          let E = G.l + 6;
          if (S = G.c, v = G.lc, p + E > _ + 1)
            throw new Error("Something wrong with hufUnpackEncTable");
          for (; E--; )
            g[p++] = 0;
          p--;
        } else if (w >= 59) {
          let E = w - 59 + 2;
          if (p + E > _ + 1)
            throw new Error("Something wrong with hufUnpackEncTable");
          for (; E--; )
            g[p++] = 0;
          p--;
        }
      }
      ne(g);
    }
    function de(o) {
      return o & 63;
    }
    function pe(o) {
      return o >> 6;
    }
    function Ue(o, l, x, p) {
      for (; l <= x; l++) {
        const _ = pe(o[l]), g = de(o[l]);
        if (_ >> g)
          throw new Error("Invalid table entry");
        if (g > 14) {
          const y = p[_ >> g - 14];
          if (y.len)
            throw new Error("Invalid table entry");
          if (y.lit++, y.p) {
            const S = y.p;
            y.p = new Array(y.lit);
            for (let v = 0; v < y.lit - 1; ++v)
              y.p[v] = S[v];
          } else
            y.p = new Array(1);
          y.p[y.lit - 1] = l;
        } else if (g) {
          let y = 0;
          for (let S = 1 << 14 - g; S > 0; S--) {
            const v = p[(_ << 14 - g) + y];
            if (v.len || v.p)
              throw new Error("Invalid table entry");
            v.len = g, v.lit = l, y++;
          }
        }
      }
      return !0;
    }
    const ge = { c: 0, lc: 0 };
    function Ke(o, l, x, p) {
      o = o << 8 | dn(x, p), l += 8, ge.c = o, ge.lc = l;
    }
    const be = { c: 0, lc: 0 };
    function ze(o, l, x, p, _, g, y, S, v) {
      if (o == l) {
        p < 8 && (Ke(x, p, _, g), x = ge.c, p = ge.lc), p -= 8;
        let w = x >> p;
        if (w = new Uint8Array([w])[0], S.value + w > v)
          return !1;
        const E = y[S.value - 1];
        for (; w-- > 0; )
          y[S.value++] = E;
      } else if (S.value < v)
        y[S.value++] = o;
      else
        return !1;
      be.c = x, be.lc = p;
    }
    function Ze(o) {
      return o & 65535;
    }
    function st(o) {
      const l = Ze(o);
      return l > 32767 ? l - 65536 : l;
    }
    const oe = { a: 0, b: 0 };
    function De(o, l) {
      const x = st(o), _ = st(l), g = x + (_ & 1) + (_ >> 1), y = g, S = g - _;
      oe.a = y, oe.b = S;
    }
    function ke(o, l) {
      const x = Ze(o), p = Ze(l), _ = x - (p >> 1) & 65535, g = p + _ - 32768 & 65535;
      oe.a = g, oe.b = _;
    }
    function Yn(o, l, x, p, _, g, y) {
      const S = y < 16384, v = x > _ ? _ : x;
      let w = 1, E, D;
      for (; w <= v; )
        w <<= 1;
      for (w >>= 1, E = w, w >>= 1; w >= 1; ) {
        D = 0;
        const C = D + g * (_ - E), F = g * w, V = g * E, k = p * w, O = p * E;
        let X, he, ue, we;
        for (; D <= C; D += V) {
          let ce = D;
          const $ = D + p * (x - E);
          for (; ce <= $; ce += O) {
            const xe = ce + k, Ee = ce + F, fe = Ee + k;
            S ? (De(o[ce + l], o[Ee + l]), X = oe.a, ue = oe.b, De(o[xe + l], o[fe + l]), he = oe.a, we = oe.b, De(X, he), o[ce + l] = oe.a, o[xe + l] = oe.b, De(ue, we), o[Ee + l] = oe.a, o[fe + l] = oe.b) : (ke(o[ce + l], o[Ee + l]), X = oe.a, ue = oe.b, ke(o[xe + l], o[fe + l]), he = oe.a, we = oe.b, ke(X, he), o[ce + l] = oe.a, o[xe + l] = oe.b, ke(ue, we), o[Ee + l] = oe.a, o[fe + l] = oe.b);
          }
          if (x & w) {
            const xe = ce + F;
            S ? De(o[ce + l], o[xe + l]) : ke(o[ce + l], o[xe + l]), X = oe.a, o[xe + l] = oe.b, o[ce + l] = X;
          }
        }
        if (_ & w) {
          let ce = D;
          const $ = D + p * (x - E);
          for (; ce <= $; ce += O) {
            const xe = ce + k;
            S ? De(o[ce + l], o[xe + l]) : ke(o[ce + l], o[xe + l]), X = oe.a, o[xe + l] = oe.b, o[ce + l] = X;
          }
        }
        E = w, w >>= 1;
      }
      return D;
    }
    function Qn(o, l, x, p, _, g, y, S, v) {
      let w = 0, E = 0;
      const D = y, C = Math.trunc(p.value + (_ + 7) / 8);
      for (; p.value < C; )
        for (Ke(w, E, x, p), w = ge.c, E = ge.lc; E >= 14; ) {
          const V = w >> E - 14 & 16383, k = l[V];
          if (k.len)
            E -= k.len, ze(k.lit, g, w, E, x, p, S, v, D), w = be.c, E = be.lc;
          else {
            if (!k.p)
              throw new Error("hufDecode issues");
            let O;
            for (O = 0; O < k.lit; O++) {
              const X = de(o[k.p[O]]);
              for (; E < X && p.value < C; )
                Ke(w, E, x, p), w = ge.c, E = ge.lc;
              if (E >= X && pe(o[k.p[O]]) == (w >> E - X & (1 << X) - 1)) {
                E -= X, ze(k.p[O], g, w, E, x, p, S, v, D), w = be.c, E = be.lc;
                break;
              }
            }
            if (O == k.lit)
              throw new Error("hufDecode issues");
          }
        }
      const F = 8 - _ & 7;
      for (w >>= F, E -= F; E > 0; ) {
        const V = l[w << 14 - E & 16383];
        if (V.len)
          E -= V.len, ze(V.lit, g, w, E, x, p, S, v, D), w = be.c, E = be.lc;
        else
          throw new Error("hufDecode issues");
      }
      return !0;
    }
    function cn(o, l, x, p, _, g) {
      const y = { value: 0 }, S = x.value, v = Te(l, x), w = Te(l, x);
      x.value += 4;
      const E = Te(l, x);
      if (x.value += 4, v < 0 || v >= 65537 || w < 0 || w >= 65537)
        throw new Error("Something wrong with HUF_ENCSIZE");
      const D = new Array(65537), C = new Array(16384);
      P(C);
      const F = p - (x.value - S);
      if (se(o, x, F, v, w, D), E > 8 * (p - (x.value - S)))
        throw new Error("Something wrong with hufUncompress");
      Ue(D, v, w, C), Qn(D, C, o, x, E, w, g, _, y);
    }
    function qn(o, l, x) {
      for (let p = 0; p < x; ++p)
        l[p] = o[l[p]];
    }
    function ln(o) {
      for (let l = 1; l < o.length; l++) {
        const x = o[l - 1] + o[l] - 128;
        o[l] = x;
      }
    }
    function hn(o, l) {
      let x = 0, p = Math.floor((o.length + 1) / 2), _ = 0;
      const g = o.length - 1;
      for (; !(_ > g || (l[_++] = o[x++], _ > g)); )
        l[_++] = o[p++];
    }
    function un(o) {
      let l = o.byteLength;
      const x = new Array();
      let p = 0;
      const _ = new DataView(o);
      for (; l > 0; ) {
        const g = _.getInt8(p++);
        if (g < 0) {
          const y = -g;
          l -= y + 1;
          for (let S = 0; S < y; S++)
            x.push(_.getUint8(p++));
        } else {
          const y = g;
          l -= 2;
          const S = _.getUint8(p++);
          for (let v = 0; v < y + 1; v++)
            x.push(S);
        }
      }
      return x;
    }
    function Jn(o, l, x, p, _, g) {
      let y = new DataView(g.buffer);
      const S = x[o.idx[0]].width, v = x[o.idx[0]].height, w = 3, E = Math.floor(S / 8), D = Math.ceil(S / 8), C = Math.ceil(v / 8), F = S - (D - 1) * 8, V = v - (C - 1) * 8, k = { value: 0 }, O = new Array(w), X = new Array(w), he = new Array(w), ue = new Array(w), we = new Array(w);
      for (let $ = 0; $ < w; ++$)
        we[$] = l[o.idx[$]], O[$] = $ < 1 ? 0 : O[$ - 1] + D * C, X[$] = new Float32Array(64), he[$] = new Uint16Array(64), ue[$] = new Uint16Array(D * 64);
      for (let $ = 0; $ < C; ++$) {
        let xe = 8;
        $ == C - 1 && (xe = V);
        let Ee = 8;
        for (let ie = 0; ie < D; ++ie) {
          ie == D - 1 && (Ee = F);
          for (let ae = 0; ae < w; ++ae)
            he[ae].fill(0), he[ae][0] = _[O[ae]++], $n(k, p, he[ae]), es(he[ae], X[ae]), ts(X[ae]);
          ns(X);
          for (let ae = 0; ae < w; ++ae)
            ss(X[ae], ue[ae], ie * 64);
        }
        let fe = 0;
        for (let ie = 0; ie < w; ++ie) {
          const ae = x[o.idx[ie]].type;
          for (let Oe = 8 * $; Oe < 8 * $ + xe; ++Oe) {
            fe = we[ie][Oe];
            for (let ct = 0; ct < E; ++ct) {
              const Ne = ct * 64 + (Oe & 7) * 8;
              y.setUint16(fe + 0 * 2 * ae, ue[ie][Ne + 0], !0), y.setUint16(fe + 1 * 2 * ae, ue[ie][Ne + 1], !0), y.setUint16(fe + 2 * 2 * ae, ue[ie][Ne + 2], !0), y.setUint16(fe + 3 * 2 * ae, ue[ie][Ne + 3], !0), y.setUint16(fe + 4 * 2 * ae, ue[ie][Ne + 4], !0), y.setUint16(fe + 5 * 2 * ae, ue[ie][Ne + 5], !0), y.setUint16(fe + 6 * 2 * ae, ue[ie][Ne + 6], !0), y.setUint16(fe + 7 * 2 * ae, ue[ie][Ne + 7], !0), fe += 8 * 2 * ae;
            }
          }
          if (E != D)
            for (let Oe = 8 * $; Oe < 8 * $ + xe; ++Oe) {
              const ct = we[ie][Oe] + 8 * E * 2 * ae, Ne = E * 64 + (Oe & 7) * 8;
              for (let yt = 0; yt < Ee; ++yt)
                y.setUint16(ct + yt * 2 * ae, ue[ie][Ne + yt], !0);
            }
        }
      }
      const ce = new Uint16Array(S);
      y = new DataView(g.buffer);
      for (let $ = 0; $ < w; ++$) {
        x[o.idx[$]].decoded = !0;
        const xe = x[o.idx[$]].type;
        if (x[$].type == 2)
          for (let Ee = 0; Ee < v; ++Ee) {
            const fe = we[$][Ee];
            for (let ie = 0; ie < S; ++ie)
              ce[ie] = y.getUint16(fe + ie * 2 * xe, !0);
            for (let ie = 0; ie < S; ++ie)
              y.setFloat32(fe + ie * 2 * xe, I(ce[ie]), !0);
          }
      }
    }
    function $n(o, l, x) {
      let p, _ = 1;
      for (; _ < 64; )
        p = l[o.value], p == 65280 ? _ = 64 : p >> 8 == 255 ? _ += p & 255 : (x[_] = p, _++), o.value++;
    }
    function es(o, l) {
      l[0] = I(o[0]), l[1] = I(o[1]), l[2] = I(o[5]), l[3] = I(o[6]), l[4] = I(o[14]), l[5] = I(o[15]), l[6] = I(o[27]), l[7] = I(o[28]), l[8] = I(o[2]), l[9] = I(o[4]), l[10] = I(o[7]), l[11] = I(o[13]), l[12] = I(o[16]), l[13] = I(o[26]), l[14] = I(o[29]), l[15] = I(o[42]), l[16] = I(o[3]), l[17] = I(o[8]), l[18] = I(o[12]), l[19] = I(o[17]), l[20] = I(o[25]), l[21] = I(o[30]), l[22] = I(o[41]), l[23] = I(o[43]), l[24] = I(o[9]), l[25] = I(o[11]), l[26] = I(o[18]), l[27] = I(o[24]), l[28] = I(o[31]), l[29] = I(o[40]), l[30] = I(o[44]), l[31] = I(o[53]), l[32] = I(o[10]), l[33] = I(o[19]), l[34] = I(o[23]), l[35] = I(o[32]), l[36] = I(o[39]), l[37] = I(o[45]), l[38] = I(o[52]), l[39] = I(o[54]), l[40] = I(o[20]), l[41] = I(o[22]), l[42] = I(o[33]), l[43] = I(o[38]), l[44] = I(o[46]), l[45] = I(o[51]), l[46] = I(o[55]), l[47] = I(o[60]), l[48] = I(o[21]), l[49] = I(o[34]), l[50] = I(o[37]), l[51] = I(o[47]), l[52] = I(o[50]), l[53] = I(o[56]), l[54] = I(o[59]), l[55] = I(o[61]), l[56] = I(o[35]), l[57] = I(o[36]), l[58] = I(o[48]), l[59] = I(o[49]), l[60] = I(o[57]), l[61] = I(o[58]), l[62] = I(o[62]), l[63] = I(o[63]);
    }
    function ts(o) {
      const l = 0.5 * Math.cos(0.7853975), x = 0.5 * Math.cos(3.14159 / 16), p = 0.5 * Math.cos(3.14159 / 8), _ = 0.5 * Math.cos(3 * 3.14159 / 16), g = 0.5 * Math.cos(5 * 3.14159 / 16), y = 0.5 * Math.cos(3 * 3.14159 / 8), S = 0.5 * Math.cos(7 * 3.14159 / 16), v = new Array(4), w = new Array(4), E = new Array(4), D = new Array(4);
      for (let C = 0; C < 8; ++C) {
        const F = C * 8;
        v[0] = p * o[F + 2], v[1] = y * o[F + 2], v[2] = p * o[F + 6], v[3] = y * o[F + 6], w[0] = x * o[F + 1] + _ * o[F + 3] + g * o[F + 5] + S * o[F + 7], w[1] = _ * o[F + 1] - S * o[F + 3] - x * o[F + 5] - g * o[F + 7], w[2] = g * o[F + 1] - x * o[F + 3] + S * o[F + 5] + _ * o[F + 7], w[3] = S * o[F + 1] - g * o[F + 3] + _ * o[F + 5] - x * o[F + 7], E[0] = l * (o[F + 0] + o[F + 4]), E[3] = l * (o[F + 0] - o[F + 4]), E[1] = v[0] + v[3], E[2] = v[1] - v[2], D[0] = E[0] + E[1], D[1] = E[3] + E[2], D[2] = E[3] - E[2], D[3] = E[0] - E[1], o[F + 0] = D[0] + w[0], o[F + 1] = D[1] + w[1], o[F + 2] = D[2] + w[2], o[F + 3] = D[3] + w[3], o[F + 4] = D[3] - w[3], o[F + 5] = D[2] - w[2], o[F + 6] = D[1] - w[1], o[F + 7] = D[0] - w[0];
      }
      for (let C = 0; C < 8; ++C)
        v[0] = p * o[16 + C], v[1] = y * o[16 + C], v[2] = p * o[48 + C], v[3] = y * o[48 + C], w[0] = x * o[8 + C] + _ * o[24 + C] + g * o[40 + C] + S * o[56 + C], w[1] = _ * o[8 + C] - S * o[24 + C] - x * o[40 + C] - g * o[56 + C], w[2] = g * o[8 + C] - x * o[24 + C] + S * o[40 + C] + _ * o[56 + C], w[3] = S * o[8 + C] - g * o[24 + C] + _ * o[40 + C] - x * o[56 + C], E[0] = l * (o[C] + o[32 + C]), E[3] = l * (o[C] - o[32 + C]), E[1] = v[0] + v[3], E[2] = v[1] - v[2], D[0] = E[0] + E[1], D[1] = E[3] + E[2], D[2] = E[3] - E[2], D[3] = E[0] - E[1], o[0 + C] = D[0] + w[0], o[8 + C] = D[1] + w[1], o[16 + C] = D[2] + w[2], o[24 + C] = D[3] + w[3], o[32 + C] = D[3] - w[3], o[40 + C] = D[2] - w[2], o[48 + C] = D[1] - w[1], o[56 + C] = D[0] - w[0];
    }
    function ns(o) {
      for (let l = 0; l < 64; ++l) {
        const x = o[0][l], p = o[1][l], _ = o[2][l];
        o[0][l] = x + 1.5747 * _, o[1][l] = x - 0.1873 * p - 0.4682 * _, o[2][l] = x + 1.8556 * p;
      }
    }
    function ss(o, l, x) {
      for (let p = 0; p < 64; ++p)
        l[x + p] = Ye.toHalfFloat(rs(o[p]));
    }
    function rs(o) {
      return o <= 1 ? Math.sign(o) * Math.pow(Math.abs(o), 2.2) : Math.sign(o) * Math.pow(A, Math.abs(o) - 1);
    }
    function xn(o) {
      return new DataView(o.array.buffer, o.offset.value, o.size);
    }
    function is(o) {
      const l = o.viewer.buffer.slice(o.offset.value, o.offset.value + o.size), x = new Uint8Array(un(l)), p = new Uint8Array(x.length);
      return ln(x), hn(x, p), new DataView(p.buffer);
    }
    function zt(o) {
      const l = o.array.slice(o.offset.value, o.offset.value + o.size), x = St(l), p = new Uint8Array(x.length);
      return ln(x), hn(x, p), new DataView(p.buffer);
    }
    function os(o) {
      const l = o.viewer, x = { value: o.offset.value }, p = new Uint16Array(o.width * o.scanlineBlockSize * (o.channels * o.type)), _ = new Uint8Array(8192);
      let g = 0;
      const y = new Array(o.channels);
      for (let V = 0; V < o.channels; V++)
        y[V] = {}, y[V].start = g, y[V].end = y[V].start, y[V].nx = o.width, y[V].ny = o.lines, y[V].size = o.type, g += y[V].nx * y[V].ny * y[V].size;
      const S = it(l, x), v = it(l, x);
      if (v >= 8192)
        throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");
      if (S <= v)
        for (let V = 0; V < v - S + 1; V++)
          _[V + S] = Ve(l, x);
      const w = new Uint16Array(65536), E = j(_, w), D = Te(l, x);
      cn(o.array, l, x, D, p, g);
      for (let V = 0; V < o.channels; ++V) {
        const k = y[V];
        for (let O = 0; O < y[V].size; ++O)
          Yn(
            p,
            k.start + O,
            k.nx,
            k.size,
            k.ny,
            k.nx * k.size,
            E
          );
      }
      qn(w, p, g);
      let C = 0;
      const F = new Uint8Array(p.buffer.byteLength);
      for (let V = 0; V < o.lines; V++)
        for (let k = 0; k < o.channels; k++) {
          const O = y[k], X = O.nx * O.size, he = new Uint8Array(p.buffer, O.end * 2, X * 2);
          F.set(he, C), C += X * 2, O.end += X;
        }
      return new DataView(F.buffer);
    }
    function as(o) {
      const l = o.array.slice(o.offset.value, o.offset.value + o.size), x = St(l), p = o.lines * o.channels * o.width, _ = o.type == 1 ? new Uint16Array(p) : new Uint32Array(p);
      let g = 0, y = 0;
      const S = new Array(4);
      for (let v = 0; v < o.lines; v++)
        for (let w = 0; w < o.channels; w++) {
          let E = 0;
          switch (o.type) {
            case 1:
              S[0] = g, S[1] = S[0] + o.width, g = S[1] + o.width;
              for (let D = 0; D < o.width; ++D) {
                const C = x[S[0]++] << 8 | x[S[1]++];
                E += C, _[y] = E, y++;
              }
              break;
            case 2:
              S[0] = g, S[1] = S[0] + o.width, S[2] = S[1] + o.width, g = S[2] + o.width;
              for (let D = 0; D < o.width; ++D) {
                const C = x[S[0]++] << 24 | x[S[1]++] << 16 | x[S[2]++] << 8;
                E += C, _[y] = E, y++;
              }
              break;
          }
        }
      return new DataView(_.buffer);
    }
    function fn(o) {
      const l = o.viewer, x = { value: o.offset.value }, p = new Uint8Array(o.width * o.lines * (o.channels * o.type * 2)), _ = {
        version: ye(l, x),
        unknownUncompressedSize: ye(l, x),
        unknownCompressedSize: ye(l, x),
        acCompressedSize: ye(l, x),
        dcCompressedSize: ye(l, x),
        rleCompressedSize: ye(l, x),
        rleUncompressedSize: ye(l, x),
        rleRawSize: ye(l, x),
        totalAcUncompressedCount: ye(l, x),
        totalDcUncompressedCount: ye(l, x),
        acCompression: ye(l, x)
      };
      if (_.version < 2)
        throw new Error("EXRLoader.parse: " + at.compression + " version " + _.version + " is unsupported");
      const g = new Array();
      let y = it(l, x) - 2;
      for (; y > 0; ) {
        const k = At(l.buffer, x), O = Ve(l, x), X = O >> 2 & 3, he = (O >> 4) - 1, ue = new Int8Array([he])[0], we = Ve(l, x);
        g.push({
          name: k,
          index: ue,
          type: we,
          compression: X
        }), y -= k.length + 3;
      }
      const S = at.channels, v = new Array(o.channels);
      for (let k = 0; k < o.channels; ++k) {
        const O = v[k] = {}, X = S[k];
        O.name = X.name, O.compression = 0, O.decoded = !1, O.type = X.pixelType, O.pLinear = X.pLinear, O.width = o.width, O.height = o.lines;
      }
      const w = {
        idx: new Array(3)
      };
      for (let k = 0; k < o.channels; ++k) {
        const O = v[k];
        for (let X = 0; X < g.length; ++X) {
          const he = g[X];
          O.name == he.name && (O.compression = he.compression, he.index >= 0 && (w.idx[he.index] = k), O.offset = k);
        }
      }
      let E, D, C;
      if (_.acCompressedSize > 0)
        switch (_.acCompression) {
          case 0:
            E = new Uint16Array(_.totalAcUncompressedCount), cn(o.array, l, x, _.acCompressedSize, E, _.totalAcUncompressedCount);
            break;
          case 1:
            const k = o.array.slice(x.value, x.value + _.totalAcUncompressedCount), O = St(k);
            E = new Uint16Array(O.buffer), x.value += _.totalAcUncompressedCount;
            break;
        }
      if (_.dcCompressedSize > 0) {
        const k = {
          array: o.array,
          offset: x,
          size: _.dcCompressedSize
        };
        D = new Uint16Array(zt(k).buffer), x.value += _.dcCompressedSize;
      }
      if (_.rleRawSize > 0) {
        const k = o.array.slice(x.value, x.value + _.rleCompressedSize), O = St(k);
        C = un(O.buffer), x.value += _.rleCompressedSize;
      }
      let F = 0;
      const V = new Array(v.length);
      for (let k = 0; k < V.length; ++k)
        V[k] = new Array();
      for (let k = 0; k < o.lines; ++k)
        for (let O = 0; O < v.length; ++O)
          V[O].push(F), F += v[O].width * o.type * 2;
      Jn(w, V, v, E, D, p);
      for (let k = 0; k < v.length; ++k) {
        const O = v[k];
        if (!O.decoded)
          switch (O.compression) {
            case 2:
              let X = 0, he = 0;
              for (let ue = 0; ue < o.lines; ++ue) {
                let we = V[k][X];
                for (let ce = 0; ce < O.width; ++ce) {
                  for (let $ = 0; $ < 2 * O.type; ++$)
                    p[we++] = C[he + $ * O.width * O.height];
                  he++;
                }
                X++;
              }
              break;
            case 1:
            default:
              throw new Error("EXRLoader.parse: unsupported channel compression");
          }
      }
      return new DataView(p.buffer);
    }
    function At(o, l) {
      const x = new Uint8Array(o);
      let p = 0;
      for (; x[l.value + p] != 0; )
        p += 1;
      const _ = new TextDecoder().decode(
        x.slice(l.value, l.value + p)
      );
      return l.value = l.value + p + 1, _;
    }
    function cs(o, l, x) {
      const p = new TextDecoder().decode(
        new Uint8Array(o).slice(l.value, l.value + x)
      );
      return l.value = l.value + x, p;
    }
    function ls(o, l) {
      const x = rt(o, l), p = Te(o, l);
      return [x, p];
    }
    function hs(o, l) {
      const x = Te(o, l), p = Te(o, l);
      return [x, p];
    }
    function rt(o, l) {
      const x = o.getInt32(l.value, !0);
      return l.value = l.value + 4, x;
    }
    function Te(o, l) {
      const x = o.getUint32(l.value, !0);
      return l.value = l.value + 4, x;
    }
    function dn(o, l) {
      const x = o[l.value];
      return l.value = l.value + 1, x;
    }
    function Ve(o, l) {
      const x = o.getUint8(l.value);
      return l.value = l.value + 1, x;
    }
    const ye = function(o, l) {
      let x;
      return "getBigInt64" in DataView.prototype ? x = Number(o.getBigInt64(l.value, !0)) : x = o.getUint32(l.value + 4, !0) + Number(o.getUint32(l.value, !0) << 32), l.value += 8, x;
    };
    function me(o, l) {
      const x = o.getFloat32(l.value, !0);
      return l.value += 4, x;
    }
    function us(o, l) {
      return Ye.toHalfFloat(me(o, l));
    }
    function I(o) {
      const l = (o & 31744) >> 10, x = o & 1023;
      return (o >> 15 ? -1 : 1) * (l ? l === 31 ? x ? NaN : 1 / 0 : Math.pow(2, l - 15) * (1 + x / 1024) : 6103515625e-14 * (x / 1024));
    }
    function it(o, l) {
      const x = o.getUint16(l.value, !0);
      return l.value += 2, x;
    }
    function xs(o, l) {
      return I(it(o, l));
    }
    function fs(o, l, x, p) {
      const _ = x.value, g = [];
      for (; x.value < _ + p - 1; ) {
        const y = At(l, x), S = rt(o, x), v = Ve(o, x);
        x.value += 3;
        const w = rt(o, x), E = rt(o, x);
        g.push({
          name: y,
          pixelType: S,
          pLinear: v,
          xSampling: w,
          ySampling: E
        });
      }
      return x.value += 1, g;
    }
    function ds(o, l) {
      const x = me(o, l), p = me(o, l), _ = me(o, l), g = me(o, l), y = me(o, l), S = me(o, l), v = me(o, l), w = me(o, l);
      return { redX: x, redY: p, greenX: _, greenY: g, blueX: y, blueY: S, whiteX: v, whiteY: w };
    }
    function ps(o, l) {
      const x = [
        "NO_COMPRESSION",
        "RLE_COMPRESSION",
        "ZIPS_COMPRESSION",
        "ZIP_COMPRESSION",
        "PIZ_COMPRESSION",
        "PXR24_COMPRESSION",
        "B44_COMPRESSION",
        "B44A_COMPRESSION",
        "DWAA_COMPRESSION",
        "DWAB_COMPRESSION"
      ], p = Ve(o, l);
      return x[p];
    }
    function ms(o, l) {
      const x = Te(o, l), p = Te(o, l), _ = Te(o, l), g = Te(o, l);
      return { xMin: x, yMin: p, xMax: _, yMax: g };
    }
    function gs(o, l) {
      const x = [
        "INCREASING_Y"
      ], p = Ve(o, l);
      return x[p];
    }
    function _s(o, l) {
      const x = me(o, l), p = me(o, l);
      return [x, p];
    }
    function bs(o, l) {
      const x = me(o, l), p = me(o, l), _ = me(o, l);
      return [x, p, _];
    }
    function Ts(o, l, x, p, _) {
      if (p === "string" || p === "stringvector" || p === "iccProfile")
        return cs(l, x, _);
      if (p === "chlist")
        return fs(o, l, x, _);
      if (p === "chromaticities")
        return ds(o, x);
      if (p === "compression")
        return ps(o, x);
      if (p === "box2i")
        return ms(o, x);
      if (p === "lineOrder")
        return gs(o, x);
      if (p === "float")
        return me(o, x);
      if (p === "v2f")
        return _s(o, x);
      if (p === "v3f")
        return bs(o, x);
      if (p === "int")
        return rt(o, x);
      if (p === "rational")
        return ls(o, x);
      if (p === "timecode")
        return hs(o, x);
      if (p === "preview")
        return x.value += _, "skipped";
      x.value += _;
    }
    function As(o, l, x) {
      const p = {};
      if (o.getUint32(0, !0) != 20000630)
        throw new Error("THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.");
      p.version = o.getUint8(4);
      const _ = o.getUint8(5);
      p.spec = {
        singleTile: !!(_ & 2),
        longName: !!(_ & 4),
        deepFormat: !!(_ & 8),
        multiPart: !!(_ & 16)
      }, x.value = 8;
      let g = !0;
      for (; g; ) {
        const y = At(l, x);
        if (y == 0)
          g = !1;
        else {
          const S = At(l, x), v = Te(o, x), w = Ts(o, l, x, S, v);
          w === void 0 ? console.warn(`EXRLoader.parse: skipped unknown header attribute type '${S}'.`) : p[y] = w;
        }
      }
      if (_ & -5)
        throw console.error("EXRHeader:", p), new Error("THREE.EXRLoader: provided file is currently unsupported.");
      return p;
    }
    function ws(o, l, x, p, _) {
      const g = {
        size: 0,
        viewer: l,
        array: x,
        offset: p,
        width: o.dataWindow.xMax - o.dataWindow.xMin + 1,
        height: o.dataWindow.yMax - o.dataWindow.yMin + 1,
        channels: o.channels.length,
        bytesPerLine: null,
        lines: null,
        inputSize: null,
        type: o.channels[0].pixelType,
        uncompress: null,
        getter: null,
        format: null,
        encoding: null
      };
      switch (o.compression) {
        case "NO_COMPRESSION":
          g.lines = 1, g.uncompress = xn;
          break;
        case "RLE_COMPRESSION":
          g.lines = 1, g.uncompress = is;
          break;
        case "ZIPS_COMPRESSION":
          g.lines = 1, g.uncompress = zt;
          break;
        case "ZIP_COMPRESSION":
          g.lines = 16, g.uncompress = zt;
          break;
        case "PIZ_COMPRESSION":
          g.lines = 32, g.uncompress = os;
          break;
        case "PXR24_COMPRESSION":
          g.lines = 16, g.uncompress = as;
          break;
        case "DWAA_COMPRESSION":
          g.lines = 32, g.uncompress = fn;
          break;
        case "DWAB_COMPRESSION":
          g.lines = 256, g.uncompress = fn;
          break;
        default:
          throw new Error("EXRLoader.parse: " + o.compression + " is unsupported");
      }
      if (g.scanlineBlockSize = g.lines, g.type == 1)
        switch (_) {
          case qe:
            g.getter = xs, g.inputSize = 2;
            break;
          case He:
            g.getter = it, g.inputSize = 2;
            break;
        }
      else if (g.type == 2)
        switch (_) {
          case qe:
            g.getter = me, g.inputSize = 4;
            break;
          case He:
            g.getter = us, g.inputSize = 4;
        }
      else
        throw new Error("EXRLoader.parse: unsupported pixelType " + g.type + " for " + o.compression + ".");
      g.blockCount = (o.dataWindow.yMax + 1) / g.scanlineBlockSize;
      for (let S = 0; S < g.blockCount; S++)
        ye(l, p);
      g.outputChannels = g.channels == 3 ? 4 : g.channels;
      const y = g.width * g.height * g.outputChannels;
      switch (_) {
        case qe:
          g.byteArray = new Float32Array(y), g.channels < g.outputChannels && g.byteArray.fill(1, 0, y);
          break;
        case He:
          g.byteArray = new Uint16Array(y), g.channels < g.outputChannels && g.byteArray.fill(15360, 0, y);
          break;
        default:
          console.error("THREE.EXRLoader: unsupported type: ", _);
          break;
      }
      return g.bytesPerLine = g.width * g.inputSize * g.channels, g.outputChannels == 4 ? (g.format = cr, g.encoding = $t) : (g.format = lr, g.encoding = $t), g;
    }
    const wt = new DataView(e), ys = new Uint8Array(e), ot = { value: 0 }, at = As(wt, e, ot), Y = ws(at, wt, ys, ot, this.type), pn = { value: 0 }, Es = { R: 0, G: 1, B: 2, A: 3, Y: 0 };
    for (let o = 0; o < Y.height / Y.scanlineBlockSize; o++) {
      const l = Te(wt, ot);
      Y.size = Te(wt, ot), Y.lines = l + Y.scanlineBlockSize > Y.height ? Y.height - l : Y.scanlineBlockSize;
      const p = Y.size < Y.lines * Y.bytesPerLine ? Y.uncompress(Y) : xn(Y);
      ot.value += Y.size;
      for (let _ = 0; _ < Y.scanlineBlockSize; _++) {
        const g = _ + o * Y.scanlineBlockSize;
        if (g >= Y.height)
          break;
        for (let y = 0; y < Y.channels; y++) {
          const S = Es[at.channels[y].name];
          for (let v = 0; v < Y.width; v++) {
            pn.value = (_ * (Y.channels * Y.width) + y * Y.width + v) * Y.inputSize;
            const w = (Y.height - 1 - g) * (Y.width * Y.outputChannels) + v * Y.outputChannels + S;
            Y.byteArray[w] = Y.getter(p, pn);
          }
        }
      }
    }
    return {
      header: at,
      width: Y.width,
      height: Y.height,
      data: Y.byteArray,
      format: Y.format,
      encoding: Y.encoding,
      type: this.type
    };
  }
  setDataType(e) {
    return this.type = e, this;
  }
  load(e, t, n, s) {
    function i(r, a) {
      r.encoding = a.encoding, r.minFilter = $e, r.magFilter = $e, r.generateMipmaps = !1, r.flipY = !1, t && t(r, a);
    }
    return super.load(e, i, n, s);
  }
}
function Ct() {
  const u = ["1449375sgRFnE", "2544020heSmRS", "66AftygW", "179217mdMCFB", "quaternionToVector3", "9452373FebIYQ", "422370AHdoVZ", "average", "getRandomRange", "getRandomIntRange", "forEach", "3pYHxYD", "round", "1066822WOFJHx", "random", "11830304UZPOar"];
  return Ct = function() {
    return u;
  }, Ct();
}
const Xe = Lt;
function Lt(u, e) {
  const t = Ct();
  return Lt = function(n, s) {
    return n = n - 332, t[n];
  }, Lt(u, e);
}
(function(u, e) {
  const t = Lt, n = u();
  for (; []; )
    try {
      if (parseInt(t(335)) / 1 + -parseInt(t(332)) / 2 + parseInt(t(346)) / 3 * (parseInt(t(336)) / 4) + parseInt(t(341)) / 5 * (-parseInt(t(337)) / 6) + -parseInt(t(340)) / 7 + parseInt(t(334)) / 8 + parseInt(t(338)) / 9 === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Ct, 771117);
class vt {
  static [Xe(343)](e, t) {
    return Math.random() * (t - e) + e;
  }
  static [Xe(344)](e, t) {
    const n = Xe;
    return Math[n(347)](Math[n(333)]() * (t - e) + e);
  }
  static [Xe(339)](e, t, n, s) {
    const i = e + e, r = t + t, a = n + n, c = e * r, h = e * a, d = t * a, f = s * i, m = s * r, T = s * a;
    return { x: c - T, y: d + f, z: h - m };
  }
  static map(e, t, n, s, i) {
    return (e - t) * (i - s) / (n - t) + s;
  }
  static [Xe(342)](e) {
    const t = Xe;
    let n = 0;
    return e[t(345)]((s) => {
      n += s;
    }), n / e.length;
  }
}
const q = pt;
(function(u, e) {
  const t = pt, n = u();
  for (; []; )
    try {
      if (-parseInt(t(363)) / 1 + parseInt(t(316)) / 2 + parseInt(t(356)) / 3 + -parseInt(t(373)) / 4 * (-parseInt(t(382)) / 5) + -parseInt(t(369)) / 6 + -parseInt(t(344)) / 7 * (-parseInt(t(321)) / 8) + -parseInt(t(374)) / 9 === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Nt, 781015);
function pt(u, e) {
  const t = Nt();
  return pt = function(n, s) {
    return n = n - 309, t[n];
  }, pt(u, e);
}
class ai {
  constructor(e, t, n) {
    const s = pt;
    this[s(342)] = n, this[s(317)] = e, this[s(350)] = t, this[s(353)] = { interactables: [], bg: [], player: null }, this[s(341)] = { looping: [], onClick: [], onHover: [], camera: [] }, this.wrappedSceneZones = [], this[s(314)](this.models), this[s(378)](this.wrappedSceneZones);
  }
  [q(314)](e) {
    const t = q, n = { interactables: [], bgMesh: [], player: null }, s = [];
    for (let i = 0; i < e.length; i++) {
      const r = e[i], a = r[t(312)][t(330)];
      let c = {};
      const h = this[t(366)](a, r[t(310)]);
      switch (a[t(357)]) {
        case t(318):
          c = this.getInteractableObject(r, a, h), n[t(329)][t(338)](c);
          break;
        case t(347):
          c = this[t(387)](r, a), s[t(338)](c);
          break;
        case t(320):
          n[t(320)][t(338)](r[t(312)]);
          break;
        case t(334):
          n[t(320)][t(338)](r[t(312)]);
          break;
        case t(349):
          n[t(349)] = r[t(312)];
          break;
      }
    }
    this[t(353)] = n, this[t(365)] = s;
  }
  [q(378)](e) {
    const t = q, n = [...e];
    for (let s = 0; s < n.length; s++) {
      const i = n[s], r = i[t(384)], a = this[t(315)](i.zone);
      a[t(359)] <= 0 && this[t(358)](i[t(328)])[t(323)]((m) => {
        a[t(338)](m);
      });
      const c = this[t(313)](a), h = new Q[t(326)]();
      c[t(335)](h);
      const d = new Q[t(326)]();
      c[t(339)](d), n[s][t(311)] = r, n[s][t(377)] = c, n[s].lookAtTargetSize = d, n[s][t(333)] = h;
    }
    this[t(365)] = n;
  }
  [q(343)](e) {
    const t = q;
    let n = null;
    return this[t(365)].forEach((s) => {
      s[t(355)] === e && (n = s);
    }), n;
  }
  getSceneZoneByName(e) {
    const t = q;
    let n = null, s = null;
    return this[t(365)][t(323)]((i) => {
      i[t(328)] === e && (n = i);
    }), { zoneBox: n, index: s };
  }
  getLoopingAnimations() {
    const e = q, t = { looping: [] };
    return this.wrappedAnimations.looping[e(323)]((n) => {
      const s = e;
      n[s(342)].forEach((i) => {
        const r = s;
        t.looping[r(338)](i);
      });
    }), t;
  }
  [q(368)]() {
    return this.wrappedAnimations;
  }
  getPlayer() {
    const e = q;
    return this[e(353)][e(349)];
  }
  [q(337)]() {
    const e = q;
    return this[e(353)][e(329)];
  }
  [q(371)](e) {
    const t = q, n = [];
    for (let s = 0; s < this[t(353)][t(329)][t(359)]; s++) {
      const i = this[t(353)][t(329)][s];
      i.zone === e && n.push(i);
    }
    return n;
  }
  [q(315)](e) {
    const t = q, n = [];
    for (let s = 0; s < this.wrappedModels[t(329)][t(359)]; s++) {
      const i = this[t(353)][t(329)][s];
      i[t(328)] === e && n[t(338)](i[t(379)][t(312)]);
    }
    return n;
  }
  getBackgroundModelsByZone(e) {
    const t = q, n = [];
    for (let s = 0; s < this[t(353)][t(320)][t(359)]; s++) {
      const i = this[t(353)].bgMesh[s];
      i[t(357)] === "Group" ? i[t(324)].forEach((r) => {
        const a = t;
        i[a(330)][a(328)] === e && n[a(338)](r);
      }) : i[t(330)][t(328)] === e && n[t(338)](i);
    }
    return n;
  }
  getBoundingBox(e) {
    const t = q, n = new Q[t(362)]();
    e[t(357)] === t(351) && (e = [...e[t(324)]]);
    for (let s = 0; s < e[t(359)]; s++) {
      const i = e[s];
      n[t(348)](i);
    }
    return n;
  }
  [q(376)](e) {
    const t = q;
    for (let n = 0; n < this.models[t(359)]; n++) {
      const s = this[t(317)][n][t(312)];
      if (s.name === e)
        return s;
    }
    return null;
  }
  [q(322)](e) {
    const t = q;
    for (let n = 0; n < this[t(342)][t(359)]; n++) {
      const s = this[t(342)][n];
      if (s.name === e)
        return s;
    }
    return null;
  }
  [q(372)](e) {
    const t = q, n = e.split(","), s = [];
    for (let i = 0; i < n[t(359)]; i++) {
      const r = n[i];
      s[t(338)](this[t(322)](r));
    }
    return s;
  }
  [q(381)](e, t) {
    const n = q;
    for (let s = 0; s < e[n(364)][n(359)]; s++)
      if (e[n(364)][s][n(310)] === t)
        return e[n(364)][s];
    return null;
  }
  getCameraAnimationStart(e) {
    const t = q, n = { position: null, rotation: null };
    for (let s = 0; s < e[t(309)].length; s++) {
      const i = e[t(309)][s];
      for (let r = 0; r < i[t(364)][t(359)]; r++) {
        const a = i[t(364)][r];
        if (a.name[t(361)](t(360)))
          n.position = new Q[t(326)](a[t(325)][0], a[t(325)][1], a.values[2]);
        else if (a.name[t(361)](".quaternion")) {
          const c = new Q[t(380)](a[t(325)][0], a.values[1], a[t(325)][2], a.values[3]);
          n[t(354)] = c;
        }
      }
    }
    return n;
  }
  getAnimations(e, t) {
    const n = q;
    let s = null, i = null, r = null, a = null;
    return n(346) in e && (s = this[n(372)](e[n(346)]), this.wrappedAnimations[n(340)][n(338)]({ name: t, animations: s })), n(370) in e && (i = this.getAnimationsFromCSV(e[n(370)]), this[n(341)][n(383)][n(338)]({ name: t, animations: i })), n(319) in e && (r = this[n(372)](e[n(319)]), this[n(341)].onHover[n(338)]({ name: t, animations: r })), n(385) in e && (a = this.getAnimationsFromCSV(e[n(385)]), this[n(341)][n(309)][n(338)]({ name: t, animations: a })), { loopAnimations: s, onHoverAnimations: r, onClickAnimations: i, cameraAnimations: a };
  }
  [q(345)](e, t, n) {
    const s = q, i = this.getRaycastTarget(t[s(336)]), r = { name: e[s(310)], raycastTarget: i, element: e, animations: {}, zone: t[s(328)] };
    return n.onHoverAnimations !== null && (r[s(342)][s(352)] = n[s(319)]), n[s(370)] !== null && (r[s(342)][s(383)] = n[s(370)]), n[s(385)] !== null && (r[s(342)][s(309)] = n.cameraAnimations), r;
  }
  [q(387)](e, t) {
    const n = q, s = { zone: t[n(328)], index: parseInt(t[n(355)], 10), position: e[n(312)][n(384)] };
    return e[n(312)][n(386)] = ![], s;
  }
  [q(331)](e) {
    const t = q, n = this[t(376)](e);
    return n == null ? (console[t(375)]("Missing raycast target for: ", e), null) : (n[t(332)][t(367)] = Q[t(327)], n[t(332)][t(386)] = ![], n);
  }
}
function Nt() {
  const u = ["getWrappedAnimations", "3197352jRBvdV", "onClickAnimations", "getInteractablesByZone", "getAnimationsFromCSV", "8CGGtUR", "9255870PhJSGf", "log", "getModel", "lookAtTargetBox", "updateSceneZones", "element", "Quaternion", "getAnimationTrack", "2265665oQkmCN", "onClick", "position", "cameraAnimations", "visible", "getCameraBoundsObject", "camera", "name", "boxCenter", "model", "getBoundingBox", "wrapScene", "getInteractableModelsByZone", "1185754Evscww", "models", "interactable", "onHoverAnimations", "bgMesh", "3741448klHQVk", "getAnimation", "forEach", "children", "values", "Vector3", "BackSide", "zone", "interactables", "userData", "getRaycastTarget", "material", "lookAtTarget", "raycastMesh", "getCenter", "raycastTarget", "getInteractables", "push", "getSize", "looping", "wrappedAnimations", "animations", "getSceneZoneByIndex", "21jMhzya", "getInteractableObject", "loopAnimations", "cameraBounds", "expandByObject", "player", "lights", "Group", "onHover", "wrappedModels", "rotation", "index", "1540077GLnvEW", "type", "getBackgroundModelsByZone", "length", ".position", "includes", "Box3", "1073208YRjciz", "tracks", "wrappedSceneZones", "getAnimations", "side"];
  return Nt = function() {
    return u;
  }, Nt();
}
function Dt(u, e) {
  const t = kt();
  return Dt = function(n, s) {
    return n = n - 295, t[n];
  }, Dt(u, e);
}
const vn = Dt;
(function(u, e) {
  const t = Dt, n = u();
  for (; []; )
    try {
      if (-parseInt(t(303)) / 1 + parseInt(t(302)) / 2 + -parseInt(t(297)) / 3 + parseInt(t(295)) / 4 * (parseInt(t(306)) / 5) + -parseInt(t(296)) / 6 + -parseInt(t(300)) / 7 + -parseInt(t(305)) / 8 * (-parseInt(t(304)) / 9) === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(kt, 292223);
function kt() {
  const u = ["258150prhkpd", "581613ZkZKpt", "10114803SvzCwT", "8QCdeJl", "30OBTDxI", "316964gYkMau", "1713000yAxvsS", "1118085MMZZhY", "json", "then", "1374499YKcSrv", "parse"];
  return kt = function() {
    return u;
  }, kt();
}
class ci {
  async [vn(301)](e) {
    const t = vn;
    let n = null;
    return await fetch(e)[t(299)]((s) => s[t(298)]()).then((s) => {
      n = s;
    }), n;
  }
}
const ee = et;
(function(u, e) {
  const t = et, n = u();
  for (; []; )
    try {
      if (parseInt(t(212)) / 1 + -parseInt(t(241)) / 2 + -parseInt(t(249)) / 3 * (-parseInt(t(281)) / 4) + -parseInt(t(247)) / 5 + -parseInt(t(269)) / 6 * (-parseInt(t(270)) / 7) + -parseInt(t(219)) / 8 + parseInt(t(266)) / 9 === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Ot, 174366);
function Ot() {
  const u = ["position", "backgroundBlurriness", "PointLightHelper", "processModel", "length", "DEBUG_xyz3d", "intensity", "97054SKdxri", "lights", "push", "getHtmlData", "add", "background", "raycastMesh", "845912bSugmt", "addGLTFModel", "quaternion", "contentType", "gltf", "normalBias", "sceneWrapper", "color", "bgMesh", "log", "compileEquirectangularShader", "renderer", ":>> GLTF element unrecognized:", "point", "size", "AxesHelper", "gltfLoader", "texture", "hdr", "addEXR", "rotation", "modelName", "669782vDFoDy", "target", "Vector3", "light", "pointLight", "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/libs/draco/", "1638605DWuxUC", "models", "6lRuVce", "setDecoderPath", "createLightContainer", "loadJson", "PointLight", "dispose", "addHDR", "scale", "Object3D", "getModel", "interactable", "directional", "jsonPath", "createModelContainer", "receiveShadow", "backgroundIntensity", "set", "2978640tojHUN", "getHtml", "iframe", "2466ZXsWle", "4235bmmNON", "total", "addLighting", "addAmbientLight", "gltf children :>> ", "getSceneWrapper", "setModelMatrixData", "content", "interactablesContent", "lerp", "build", "532096Yzmewx", "forEach", "cameraBounds", "path", "environment", "addPointLight", "EquirectangularReflectionMapping", "enableAll", "load", "PMREMGenerator", "DirectionalLight", "userData", "scene", "loadModel", "SpotLight", "Group", "DirectionalLightHelper", "children", "castShadow", "AmbientLight", "loaded", "layers", "name", "type", '<iframe id="XYZ3d-fullscreen" src="', "fromEquirectangular", "jsonData", "animations", "player", "ambientLight", "addDirectionalLight", "exr", "directionalLight"];
  return Ot = function() {
    return u;
  }, Ot();
}
function et(u, e) {
  const t = Ot();
  return et = function(n, s) {
    return n = n - 200, t[n];
  }, et(u, e);
}
class li {
  constructor(e, t, n) {
    const s = et;
    this[s(293)] = e, this[s(230)] = t, this.jsonPath = n, this[s(225)];
    const i = new jr();
    if (i[s(250)](s(246)), this[s(235)] = new xr(), this[s(235)].setDRACOLoader(i), window.DEBUG_xyz3d) {
      const r = new Q[s(234)](5e3);
      this[s(293)].add(r);
    }
  }
  [ee(275)]() {
    return this[ee(225)];
  }
  async [ee(252)]() {
    const e = ee;
    return await new ci().parse(this[e(261)]);
  }
  async [ee(280)](e) {
    const t = ee, n = await this[t(252)](), s = [], i = [], r = await this[t(220)](n[t(248)], e), a = this[t(272)](n[t(213)]);
    return a[t(214)](...r[t(213)]), s[t(214)](...r.models), i.push(...r[t(308)]), this[t(225)] = new ai(s, a, i), this.sceneWrapper;
  }
  async [ee(220)](e, t) {
    const n = ee, s = [], i = [], r = [];
    for (let a = 0; a < e[n(209)]; a++) {
      const c = e[a], h = function(d) {
        const f = n;
        t(a + 1, e[f(209)], 100 * d[f(301)] / d[f(271)]);
      };
      await this[n(294)](c, h).then((d) => {
        const f = n;
        window[f(210)] && console[f(228)](f(274), [...d.gltf[f(293)][f(298)]]);
        const m = this[f(208)](d);
        s[f(214)](...m[f(248)]), i[f(214)](...m.lights), r[f(214)](...m[f(308)]);
      });
    }
    return { models: s, lights: i, animations: r };
  }
  [ee(258)](e, t) {
    const n = ee;
    for (let s = 0; s < e[n(209)]; s++) {
      const i = e[s];
      if (i[n(303)] === t)
        return i;
    }
    return null;
  }
  createModelContainer(e, t) {
    const n = ee, s = { name: e[n(303)], model: e };
    switch (this.setModelMatrixData(e, t), e[n(299)] = t[n(299)], e[n(263)] = t.receiveShadow, e[n(292)][n(304)]) {
      case n(227):
        break;
      case n(259):
        const i = this[n(267)](t, e[n(303)]);
        s[n(222)] = i.type, s[n(277)] = i[n(277)];
        break;
      case n(218):
        break;
      case n(283):
        break;
      case n(200):
        break;
    }
    return s;
  }
  [ee(251)](e, t) {
    return { type: e, light: t };
  }
  [ee(208)](e) {
    const t = ee, n = [...e[t(223)][t(293)].children], s = e[t(223)][t(308)], i = [], r = [], a = 1e5;
    for (let c = 0; c < n[t(209)]; c++) {
      const h = n[c];
      switch (h[t(302)][t(288)](), h[t(304)]) {
        case "Mesh":
          i[t(214)](this.createModelContainer(h, e[t(307)]));
          break;
        case t(296):
          h.children[t(282)]((d) => {
            this[t(276)](d, e.jsonData);
          }), i[t(214)](this[t(262)](h, e[t(307)]));
          break;
        case t(257):
          i[t(214)](this[t(262)](h, e[t(307)]));
          break;
        case "PointLight":
          h[t(211)] /= a, r[t(214)](this[t(251)](t(232), h));
          break;
        case t(291):
          h[t(211)] /= a, r.push(this[t(251)](t(260), h));
          break;
        case t(295):
          h[t(211)] /= a, r[t(214)](this[t(251)]("spot", h));
          break;
        default:
          console[t(228)](t(231), h);
          break;
      }
      this[t(293)][t(216)](h);
    }
    return { models: i, lights: r, animations: s };
  }
  [ee(276)](e, t) {
    const n = ee;
    e[n(205)][n(265)](e.position.x + t[n(205)].x, e.position.y + t.position.y, e.position.z + t[n(205)].z), e[n(221)][n(265)](t[n(239)].x, t[n(239)].y, t[n(239)].z, t[n(239)].w), e[n(256)][n(265)](t[n(256)].x, t.scale.y, t[n(256)].z);
  }
  [ee(267)](e, t) {
    const n = ee, s = this[n(215)](e, t);
    if (s[n(277)] !== void 0)
      return s[n(304)] === n(268) && (s[n(277)] = n(305) + s.content + '"></iframe>'), s;
  }
  [ee(215)](e, t) {
    const n = ee, s = e[n(278)];
    for (let i = 0; i < s[n(209)]; i++) {
      const r = s[i];
      if (r[n(240)] === t)
        return r;
    }
    return null;
  }
  async [ee(294)](e, t) {
    return new Promise((n) => {
      const s = et;
      return this.gltfLoader[s(289)](".." + e.path, function(i) {
        n({ gltf: i, jsonData: e });
      }, t, function(i) {
        console[s(228)]("An error happened " + i);
      });
    });
  }
  [ee(272)](e) {
    const t = ee, n = [];
    for (let s = 0; s < e[t(209)]; s++) {
      const i = e[s];
      let r, a;
      const c = { type: null, light: null };
      switch (i.type) {
        case t(237):
          this[t(255)](i.path, i[t(264)], i[t(206)]);
          break;
        case t(203):
          this[t(238)](i[t(284)], i[t(264)], i[t(206)]);
          break;
        case "pointLight":
          r = new Q[t(243)](i[t(205)].x, i.position.y, i[t(205)].z), a = this[t(286)](r, i[t(226)], i[t(211)], i[t(233)], i[t(299)]), c[t(304)] = t(245), c[t(244)] = a;
          break;
        case "directionalLight":
          r = new Q[t(243)](i.position.x, i[t(205)].y, i[t(205)].z);
          const h = new Q.Vector3(i[t(242)].x, i[t(242)].y, i.target.z);
          a = this[t(202)](r, h, i[t(226)], i[t(211)], i[t(299)]), c[t(304)] = t(204), c[t(244)] = a;
          break;
        case t(201):
          a = this[t(273)](i[t(226)], i[t(211)]), c[t(304)] = t(201), c[t(244)] = a;
          break;
      }
      n[t(214)](c);
    }
    return n;
  }
  [ee(286)](e, t = 0, n = 1, s = 1500, i = ![]) {
    const r = ee, a = new Q[r(253)](t, n, s);
    if (a[r(205)].lerp(e, 1), a[r(299)] = i, a[r(224)] = 0.1, this.scene[r(216)](a), window[r(210)]) {
      const c = new Q[r(207)](a, 0.25);
      this.scene[r(216)](c);
    }
    return a;
  }
  addAmbientLight(e = 0, t = 1) {
    const n = ee, s = new Q[n(300)](e, t);
    return this[n(293)][n(216)](s), s;
  }
  [ee(202)](e, t = new Q[ee(243)](0, 0, 0), n = 16777215, s = 2, i = ![]) {
    const r = ee, a = new Q[r(291)](n, s);
    if (a[r(205)].lerp(e, 1), a[r(242)][r(205)][r(279)](t, 1), a.castShadow = i, a.normalBias = 0.1, this[r(293)].add(a), this[r(293)][r(216)](a[r(242)]), window[r(210)]) {
      const c = new Q[r(297)](a);
      this[r(293)][r(216)](c);
    }
    return a;
  }
  [ee(255)](e, t, n) {
    const s = ee, i = new Q[s(290)](this[s(230)]);
    i[s(229)]();
    let r;
    new Vr()[s(289)](".." + e, (a) => {
      const c = s;
      r = i[c(306)](a)[c(236)], this.scene.environment = r, this[c(293)][c(217)] = r, this[c(293)][c(264)] = t, this[c(293)][c(206)] = n, a[c(254)](), i[c(254)]();
    });
  }
  [ee(238)](e, t, n) {
    const s = ee, i = new Q[s(290)](this.renderer);
    i[s(229)]();
    let r;
    new oi()[s(289)](".." + e, (a) => {
      const c = s;
      a.mapping = Q[c(287)], r = i.fromEquirectangular(a).texture, this[c(293)][c(285)] = r, this[c(293)][c(217)] = r, this[c(293)][c(264)] = t, this[c(293)].backgroundBlurriness = n, a[c(254)](), i.dispose();
    });
  }
}
class Tt {
  constructor() {
    this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  setSize() {
  }
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {
  }
}
const hi = new On(-1, 1, 1, -1, 0, 1), an = new on();
an.setAttribute("position", new Fn([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
an.setAttribute("uv", new Fn([0, 2, 0, 0, 2, 0], 2));
class Xn {
  constructor(e) {
    this._mesh = new kn(an, e);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(e) {
    e.render(this._mesh, hi);
  }
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
const Wn = {
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`
  )
}, ui = {
  shaderID: "luminosityHighPass",
  uniforms: {
    tDiffuse: { value: null },
    luminosityThreshold: { value: 1 },
    smoothWidth: { value: 1 },
    defaultColor: { value: new Me(0) },
    defaultOpacity: { value: 0 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
  )
};
class tt extends Tt {
  constructor(e, t, n, s) {
    super(), this.strength = t !== void 0 ? t : 1, this.radius = n, this.threshold = s, this.resolution = e !== void 0 ? new Re(e.x, e.y) : new Re(256, 256), this.clearColor = new Me(0, 0, 0), this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
    let i = Math.round(this.resolution.x / 2), r = Math.round(this.resolution.y / 2);
    this.renderTargetBright = new Rt(i, r), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
    for (let f = 0; f < this.nMips; f++) {
      const m = new Rt(i, r);
      m.texture.name = "UnrealBloomPass.h" + f, m.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(m);
      const T = new Rt(i, r);
      T.texture.name = "UnrealBloomPass.v" + f, T.texture.generateMipmaps = !1, this.renderTargetsVertical.push(T), i = Math.round(i / 2), r = Math.round(r / 2);
    }
    const a = ui;
    this.highPassUniforms = en.clone(a.uniforms), this.highPassUniforms.luminosityThreshold.value = s, this.highPassUniforms.smoothWidth.value = 0.01, this.materialHighPassFilter = new Qe({
      uniforms: this.highPassUniforms,
      vertexShader: a.vertexShader,
      fragmentShader: a.fragmentShader,
      defines: {}
    }), this.separableBlurMaterials = [];
    const c = [3, 5, 7, 9, 11];
    i = Math.round(this.resolution.x / 2), r = Math.round(this.resolution.y / 2);
    for (let f = 0; f < this.nMips; f++)
      this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[f])), this.separableBlurMaterials[f].uniforms.texSize.value = new Re(i, r), i = Math.round(i / 2), r = Math.round(r / 2);
    this.compositeMaterial = this.getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = t, this.compositeMaterial.uniforms.bloomRadius.value = 0.1, this.compositeMaterial.needsUpdate = !0;
    const h = [1, 0.8, 0.6, 0.4, 0.2];
    this.compositeMaterial.uniforms.bloomFactors.value = h, this.bloomTintColors = [new Le(1, 1, 1), new Le(1, 1, 1), new Le(1, 1, 1), new Le(1, 1, 1), new Le(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;
    const d = Wn;
    this.copyUniforms = en.clone(d.uniforms), this.copyUniforms.opacity.value = 1, this.materialCopy = new Qe({
      uniforms: this.copyUniforms,
      vertexShader: d.vertexShader,
      fragmentShader: d.fragmentShader,
      blending: hr,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this.enabled = !0, this.needsSwap = !1, this._oldClearColor = new Me(), this.oldClearAlpha = 1, this.basic = new We(), this.fsQuad = new Xn(null);
  }
  dispose() {
    for (let e = 0; e < this.renderTargetsHorizontal.length; e++)
      this.renderTargetsHorizontal[e].dispose();
    for (let e = 0; e < this.renderTargetsVertical.length; e++)
      this.renderTargetsVertical[e].dispose();
    this.renderTargetBright.dispose();
    for (let e = 0; e < this.separableBlurMaterials.length; e++)
      this.separableBlurMaterials[e].dispose();
    this.compositeMaterial.dispose(), this.materialCopy.dispose(), this.basic.dispose(), this.fsQuad.dispose();
  }
  setSize(e, t) {
    let n = Math.round(e / 2), s = Math.round(t / 2);
    this.renderTargetBright.setSize(n, s);
    for (let i = 0; i < this.nMips; i++)
      this.renderTargetsHorizontal[i].setSize(n, s), this.renderTargetsVertical[i].setSize(n, s), this.separableBlurMaterials[i].uniforms.texSize.value = new Re(n, s), n = Math.round(n / 2), s = Math.round(s / 2);
  }
  render(e, t, n, s, i) {
    e.getClearColor(this._oldClearColor), this.oldClearAlpha = e.getClearAlpha();
    const r = e.autoClear;
    e.autoClear = !1, e.setClearColor(this.clearColor, 0), i && e.state.buffers.stencil.setTest(!1), this.renderToScreen && (this.fsQuad.material = this.basic, this.basic.map = n.texture, e.setRenderTarget(null), e.clear(), this.fsQuad.render(e)), this.highPassUniforms.tDiffuse.value = n.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this.fsQuad.material = this.materialHighPassFilter, e.setRenderTarget(this.renderTargetBright), e.clear(), this.fsQuad.render(e);
    let a = this.renderTargetBright;
    for (let c = 0; c < this.nMips; c++)
      this.fsQuad.material = this.separableBlurMaterials[c], this.separableBlurMaterials[c].uniforms.colorTexture.value = a.texture, this.separableBlurMaterials[c].uniforms.direction.value = tt.BlurDirectionX, e.setRenderTarget(this.renderTargetsHorizontal[c]), e.clear(), this.fsQuad.render(e), this.separableBlurMaterials[c].uniforms.colorTexture.value = this.renderTargetsHorizontal[c].texture, this.separableBlurMaterials[c].uniforms.direction.value = tt.BlurDirectionY, e.setRenderTarget(this.renderTargetsVertical[c]), e.clear(), this.fsQuad.render(e), a = this.renderTargetsVertical[c];
    this.fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, e.setRenderTarget(this.renderTargetsHorizontal[0]), e.clear(), this.fsQuad.render(e), this.fsQuad.material = this.materialCopy, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, i && e.state.buffers.stencil.setTest(!0), this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(n), this.fsQuad.render(e)), e.setClearColor(this._oldClearColor, this.oldClearAlpha), e.autoClear = r;
  }
  getSeperableBlurMaterial(e) {
    return new Qe({
      defines: {
        KERNEL_RADIUS: e,
        SIGMA: e
      },
      uniforms: {
        colorTexture: { value: null },
        texSize: { value: new Re(0.5, 0.5) },
        direction: { value: new Re(0.5, 0.5) }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`
    });
  }
  getCompositeMaterial(e) {
    return new Qe({
      defines: {
        NUM_MIPS: e
      },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`
    });
  }
}
tt.BlurDirectionX = new Re(1, 0);
tt.BlurDirectionY = new Re(0, 1);
class xi extends Tt {
  constructor(e, t, n, s, i) {
    super(), this.scene = e, this.camera = t, this.overrideMaterial = n, this.clearColor = s, this.clearAlpha = i !== void 0 ? i : 0, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new Me();
  }
  render(e, t, n) {
    const s = e.autoClear;
    e.autoClear = !1;
    let i, r;
    this.overrideMaterial !== void 0 && (r = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor && (e.getClearColor(this._oldClearColor), i = e.getClearAlpha(), e.setClearColor(this.clearColor, this.clearAlpha)), this.clearDepth && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : n), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor && e.setClearColor(this._oldClearColor, i), this.overrideMaterial !== void 0 && (this.scene.overrideMaterial = r), e.autoClear = s;
  }
}
class fi extends Tt {
  constructor(e, t) {
    super(), this.textureID = t !== void 0 ? t : "tDiffuse", e instanceof Qe ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = en.clone(e.uniforms), this.material = new Qe({
      defines: Object.assign({}, e.defines),
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader
    })), this.fsQuad = new Xn(this.material);
  }
  render(e, t, n) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this.fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e));
  }
  dispose() {
    this.material.dispose(), this.fsQuad.dispose();
  }
}
class Rn extends Tt {
  constructor(e, t) {
    super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  render(e, t, n) {
    const s = e.getContext(), i = e.state;
    i.buffers.color.setMask(!1), i.buffers.depth.setMask(!1), i.buffers.color.setLocked(!0), i.buffers.depth.setLocked(!0);
    let r, a;
    this.inverse ? (r = 0, a = 1) : (r = 1, a = 0), i.buffers.stencil.setTest(!0), i.buffers.stencil.setOp(s.REPLACE, s.REPLACE, s.REPLACE), i.buffers.stencil.setFunc(s.ALWAYS, r, 4294967295), i.buffers.stencil.setClear(a), i.buffers.stencil.setLocked(!0), e.setRenderTarget(n), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), i.buffers.color.setLocked(!1), i.buffers.depth.setLocked(!1), i.buffers.stencil.setLocked(!1), i.buffers.stencil.setFunc(s.EQUAL, 1, 4294967295), i.buffers.stencil.setOp(s.KEEP, s.KEEP, s.KEEP), i.buffers.stencil.setLocked(!0);
  }
}
class di extends Tt {
  constructor() {
    super(), this.needsSwap = !1;
  }
  render(e) {
    e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
  }
}
class pi {
  constructor(e, t) {
    if (this.renderer = e, t === void 0) {
      const n = e.getSize(new Re());
      this._pixelRatio = e.getPixelRatio(), this._width = n.width, this._height = n.height, t = new Rt(this._width * this._pixelRatio, this._height * this._pixelRatio), t.texture.name = "EffectComposer.rt1";
    } else
      this._pixelRatio = 1, this._width = t.width, this._height = t.height;
    this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new fi(Wn), this.clock = new ur();
  }
  swapBuffers() {
    const e = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = e;
  }
  addPass(e) {
    this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  insertPass(e, t) {
    this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  removePass(e) {
    const t = this.passes.indexOf(e);
    t !== -1 && this.passes.splice(t, 1);
  }
  isLastEnabledPass(e) {
    for (let t = e + 1; t < this.passes.length; t++)
      if (this.passes[t].enabled)
        return !1;
    return !0;
  }
  render(e) {
    e === void 0 && (e = this.clock.getDelta());
    const t = this.renderer.getRenderTarget();
    let n = !1;
    for (let s = 0, i = this.passes.length; s < i; s++) {
      const r = this.passes[s];
      if (r.enabled !== !1) {
        if (r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(s), r.render(this.renderer, this.writeBuffer, this.readBuffer, e, n), r.needsSwap) {
          if (n) {
            const a = this.renderer.getContext(), c = this.renderer.state.buffers.stencil;
            c.setFunc(a.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), c.setFunc(a.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        Rn !== void 0 && (r instanceof Rn ? n = !0 : r instanceof di && (n = !1));
      }
    }
    this.renderer.setRenderTarget(t);
  }
  reset(e) {
    if (e === void 0) {
      const t = this.renderer.getSize(new Re());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  setSize(e, t) {
    this._width = e, this._height = t;
    const n = this._width * this._pixelRatio, s = this._height * this._pixelRatio;
    this.renderTarget1.setSize(n, s), this.renderTarget2.setSize(n, s);
    for (let i = 0; i < this.passes.length; i++)
      this.passes[i].setSize(n, s);
  }
  setPixelRatio(e) {
    this._pixelRatio = e, this.setSize(this._width, this._height);
  }
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
const _e = mt;
(function(u, e) {
  const t = mt, n = u();
  for (; []; )
    try {
      if (parseInt(t(528)) / 1 * (-parseInt(t(531)) / 2) + -parseInt(t(550)) / 3 * (-parseInt(t(506)) / 4) + parseInt(t(551)) / 5 * (-parseInt(t(499)) / 6) + -parseInt(t(508)) / 7 * (-parseInt(t(537)) / 8) + parseInt(t(507)) / 9 + parseInt(t(505)) / 10 + -parseInt(t(541)) / 11 === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Ut, 114775);
function mt(u, e) {
  const t = Ut();
  return mt = function(n, s) {
    return n = n - 497, t[n];
  }, mt(u, e);
}
function Ut() {
  const u = ["PerspectiveCamera", "WebGLRenderer", "finalComposer", "bloomParams", ");  ", "radius", "setSize", "gammaFactor", "184374CLQvgd", "190975CqPCmt", "ReinhardToneMapping", "scrollWidth", "Scene", "cameraParams", "pow", "updateProjectionMatrix", "12pfMJpM", "addPass", "setupRenderer", "error", "threshold", "Camera", "1975280hErFiC", "8gLcSCc", "1338876YDWDsc", "164843ebDrJz", "width", "reset", "height", "setupPostEffects", "toneMappingExposure", "camera", "postEffects", "getElementById", "renderer", "getCamera", "onWindowResized", "shadowMap", "high-performance", "enabled", "enableAll", "bloom", "aspect", "canvas", "Canvas not found. Make sure this returns the correct element: document.GetElementByID(", "1dIlNSy", "strength", "scene", "110174MFshtY", "isPostEffectsEnabled", "scrollHeight", "getScene", "fov", "Cache", "8lgrVBA", "render", "exposure", "toneMapping", "2711555SrtRpQ"];
  return Ut = function() {
    return u;
  }, Ut();
}
class mi {
  constructor(e, t) {
    const n = mt;
    Q[n(536)][n(522)] = !![], this[n(526)] = document[n(516)](e), !this[n(526)] && console[n(502)](n(527), e, n(546)), this[n(555)] = t, this[n(545)] = t[n(515)][n(524)], this[n(509)] = this.canvas.scrollWidth, this[n(511)] = this[n(526)][n(533)], this[n(514)] = new Q[n(542)](this[n(555)][n(535)], this[n(509)] / this.height, 0.1, 1e4), this[n(514)].name = n(504), this[n(530)] = new Q[n(554)](), this[n(517)], this[n(544)], this.bloomPass, this[n(532)] = t[n(515)][n(522)], this[n(501)](), this.isPostEffectsEnabled && this.setupPostEffects();
  }
  [_e(518)]() {
    return this[_e(514)];
  }
  [_e(534)]() {
    return this[_e(530)];
  }
  getRenderer() {
    return this[_e(517)];
  }
  [_e(501)]() {
    const e = _e;
    this[e(517)] = new Q[e(543)]({ canvas: this.canvas, antialias: !![], powerPreference: e(521), failIfMajorPerformanceCaveat: !![] }), this[e(517)][e(520)].enabled = !![], this[e(514)].layers[e(523)](), this[e(517)][e(548)](this.width, this[e(511)]), this.renderer[e(540)] = Q[e(552)], this.renderer[e(513)] = Math[e(497)](this.bloomParams[e(539)], 4), this[e(517)][e(549)] = 4;
  }
  [_e(512)]() {
    const e = _e, t = new xi(this[e(530)], this[e(514)]), n = new tt(new Q.Vector2(this[e(509)], this[e(511)]), this[e(545)][e(529)], this[e(545)][e(547)], this.bloomParams[e(503)]);
    n[e(539)] = this[e(545)].exposure, n[e(503)] = this.bloomParams[e(503)], n.strength = this.bloomParams.strength, n[e(547)] = this.bloomParams[e(547)], this.finalComposer = new pi(this[e(517)]), this.finalComposer[e(548)](this.width, this.height), this[e(544)][e(500)](t), this.finalComposer[e(500)](n);
  }
  [_e(519)]() {
    const e = _e;
    this[e(509)] = this.canvas[e(553)], this.height = this[e(526)].scrollHeight, this[e(514)][e(525)] = this.width / this[e(511)], this.camera[e(498)](), this[e(517)][e(548)](this[e(509)], this[e(511)]), this.isPostEffectsEnabled && this[e(544)][e(548)](this[e(509)], this[e(511)]);
  }
  [_e(510)]() {
    this[_e(519)]();
  }
  [_e(538)]() {
    const e = _e;
    this[e(532)] ? this[e(544)][e(538)]() : this[e(517)].render(this[e(530)], this[e(514)]);
  }
}
const Ae = Pt;
(function(u, e) {
  const t = Pt, n = u();
  for (; []; )
    try {
      if (-parseInt(t(420)) / 1 * (-parseInt(t(376)) / 2) + parseInt(t(356)) / 3 * (parseInt(t(403)) / 4) + parseInt(t(393)) / 5 + parseInt(t(378)) / 6 * (parseInt(t(394)) / 7) + -parseInt(t(363)) / 8 + parseInt(t(353)) / 9 + -parseInt(t(375)) / 10 === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Ft, 680029);
const ut = new Q.Raycaster();
class gi extends Q[Ae(377)] {
  constructor(e, t, n) {
    const s = Ae;
    super(), this[s(367)] = e, this[s(369)] = t, this[s(416)] = n, this[s(396)] = null, this[s(408)] = null, this[s(373)] = [], this[s(412)] = 30, this[s(383)] = !![], this[s(389)] = ![], this[s(359)] = window[s(365)] / 2, this[s(359)] = window[s(399)] / 2, this.frame = 0, this[s(422)] = this[s(412)], this[s(361)] = this.getIntersectableObjects(this[s(367)]), this.pointer = new Q[s(400)](), this[s(409)] = (i) => {
      const r = s;
      if (this[r(383)] !== ![] && (this[r(404)] += 1, this.frame > Number[r(372)] && (this[r(404)] = 0), this.updatePointer(i), ut[r(386)](this[r(358)], this._camera), this[r(361)] == null && (this[r(361)] = getIntersectableObjects(this[r(367)])), i[r(368)] === r(387) || i[r(368)] === "pen" || i.pointerType === "touch"))
        if (this[r(373)][r(354)] = 0, ut.setFromCamera(this.pointer, this[r(369)]), ut[r(410)](this.intersectableObjects, ![], this[r(373)]), this[r(373)][r(354)] > 0) {
          let a = this[r(373)][0][r(405)];
          a = this[r(370)](a[r(381)]), this._hovered !== a && this._hovered !== null && (this.dispatchEvent({ type: r(385), object: this._hovered }), this[r(416)].style[r(355)] = r(401), this[r(408)] = null), this._hovered !== a && (this[r(411)]({ type: r(414), object: a }), this[r(416)][r(423)][r(355)] = r(358), this[r(408)] = a);
        } else
          this[r(408)] !== null && (this.dispatchEvent({ type: r(385), object: this._hovered }), this[r(416)][r(423)][r(355)] = r(401), this[r(408)] = null);
    }, this.onPointerUp = (i) => {
      const r = s;
      if (this.enabled !== ![] && !(typeof i === TouchEvent && i[r(407)][r(354)] > 1)) {
        if (this[r(404)] > Math[r(417)](this.fps * 2, 20)) {
          window[r(382)] && console[r(391)]("Click discarded: ", this[r(404)], ">", Math[r(417)](this.fps * 2, 20)), this.frame = 0;
          return;
        }
        if (window[r(382)] && console[r(391)](r(379), this[r(404)], ">", Math[r(417)](this.fps * 2, 20)), this[r(404)] = 0, (this.intersectableObjects == null || this[r(361)] == null) && (this.intersectableObjects = getIntersectableObjects(this[r(367)])), this[r(416)][r(423)].touchAction = r(392), this[r(364)](i), this[r(373)][r(354)] = 0, ut[r(386)](this[r(358)], this[r(369)]), ut.intersectObjects(this[r(361)], ![], this[r(373)]), this[r(373)][r(354)] > 0) {
          const a = this._intersections[0][r(405)];
          this._selected = this.getHitObject(a[r(381)]), this.dispatchEvent({ type: r(415), object: this._selected }), this._hovered = this._selected;
        }
      }
    }, this.activate();
  }
  [Ae(374)]() {
    const e = Ae;
    this[e(416)][e(362)](e(397), this[e(409)]), this[e(416)][e(362)](e(398), this[e(406)]), this[e(416)].addEventListener(e(390), this[e(406)]);
  }
  [Ae(421)]() {
    const e = Ae;
    this[e(416)][e(360)](e(397), this.onPointerMove), this[e(416)][e(360)](e(398), this[e(406)]), this[e(416)][e(360)](e(390), this[e(406)]), this[e(416)].style[e(355)] = "";
  }
  [Ae(364)](e) {
    const t = Ae, n = this[t(416)].getBoundingClientRect();
    this[t(358)].x = (e[t(419)] - n[t(371)]) / n[t(402)] * 2 - 1, this[t(358)].y = -(e[t(357)] - n[t(395)]) / n[t(384)] * 2 + 1;
  }
  [Ae(380)]() {
    this[Ae(421)]();
  }
  [Ae(413)]() {
    return this._objects;
  }
  [Ae(388)](e) {
    const t = Ae, n = [];
    for (let s = 0; s < e[t(354)]; s++) {
      const i = e[s];
      n[t(418)](i[t(366)]);
    }
    return n;
  }
  getHitObject(e) {
    const t = Ae;
    for (let n = 0; n < this._objects[t(354)]; n++) {
      const s = this[t(367)][n];
      if (s[t(366)][t(381)] === e)
        return s;
    }
    return null;
  }
}
function Pt(u, e) {
  const t = Ft();
  return Pt = function(n, s) {
    return n = n - 353, t[n];
  }, Pt(u, e);
}
function Ft() {
  const u = ["none", "842105Uzllxd", "1655780CzlpKU", "top", "_selected", "pointermove", "touchend", "innerHeight", "Vector2", "auto", "width", "17436mYsrLr", "frame", "object", "onPointerUp", "touches", "_hovered", "onPointerMove", "intersectObjects", "dispatchEvent", "fps", "getObjects", "hoveron", "pointerdown", "_domElement", "min", "push", "clientX", "3FTsnfE", "deactivate", "minStaticFrames", "style", "9088353UbFxjR", "length", "cursor", "372rvifBQ", "clientY", "pointer", "halfWindowWidth", "removeEventListener", "intersectableObjects", "addEventListener", "9675728lTnMmw", "updatePointer", "innerWidth", "raycastTarget", "_objects", "pointerType", "_camera", "getHitObject", "left", "MAX_SAFE_INTEGER", "_intersections", "activate", "21457130bmjxOB", "755836dOyBBs", "EventDispatcher", "30FRuMpe", "Click registered: ", "dispose", "name", "DEBUG_xyz3d", "enabled", "height", "hoveroff", "setFromCamera", "mouse", "getIntersectableObjects", "transformGroup", "mouseup", "log"];
  return Ft = function() {
    return u;
  }, Ft();
}
function Bt() {
  const u = ["resetCamera", "cameraParams", "orbit", "activeSceneZone", "activeZoneIndex", "tiltXArr", "rotateTo", "changeSceneZoneByIndex", "saveState", "setDampFactor", "resetControlsLimits", "Vector2", "tiltYArr", "pop", "nextSceneZone", "maxZoom", "5117550wDkYRe", "start", "orbitCameraTo", "setInputActive", "gyro", "fov", "smoothTime", "sub", "pointer", "setPaused", "updateProjectionMatrix", "atan", "bind", "init", "setCameraOffset", "hoverOverCallback", "hoveroff", "45132jcekvI", "azimuthAngle", "rotationTarget", "position", "raycastManager", "setLength", "polarAngle", "onHoverOff", "sceneWrapper", "then", "hoveron", "maxDistance", "addEventListener", "dispose", "maxGyroSignals", "fill", "install", "tiltX", "filmOffset", "targetPosition", "currentAction", "test", "lookAtTarget", "setZoom", "18JsIcBV", "object", "ACTION", "1096557IEoasc", "push", "reading", "getSceneZoneByName", "paused", "8773090qbAanS", "moveCamera", "hoverOffCallback", "isMobileDevice", "setupCamera", "fps", "zoomTo", "followMouse", "camera", "maxAzimuthAngle", "domElement", "boxCenter", "323286tBJxen", "changeCameraZone", "lookAtTargetSize", "enabled", "maxPolarAngle", "length", "normalize", "add", "pointerDownCallback", "setupRaycaster", "defaultDampFactor", "max", "clone", "7980256OoiFPo", "minAzimuthAngle", "ROTATE", "tiltY", "restThreshold", "update", "aspect", "onPointerDown", "minPolarAngle", "275yBsZCv", "two", "distance", "right", "TOUCH_ZOOM", "distanceTo", "getInteractablesByZone", "lookAt", "mouseButtons", "2050498JccwOy", "defaultRotationDistance", "active", "fitCameraOffset", "onHoverOver", "7BNMqLF", "controls", "changeSceneZoneByName", "log", "setLookAt", "average", "fitCameraToZone"];
  return Bt = function() {
    return u;
  }, Bt();
}
const K = gt;
function gt(u, e) {
  const t = Bt();
  return gt = function(n, s) {
    return n = n - 485, t[n];
  }, gt(u, e);
}
(function(u, e) {
  const t = gt, n = u();
  for (; []; )
    try {
      if (-parseInt(t(520)) / 1 + -parseInt(t(568)) / 2 + -parseInt(t(537)) / 3 + parseInt(t(493)) / 4 * (-parseInt(t(559)) / 5) + parseInt(t(596)) / 6 * (parseInt(t(573)) / 7) + parseInt(t(550)) / 8 + -parseInt(t(517)) / 9 * (-parseInt(t(525)) / 10) === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Bt, 754942);
class _i {
  constructor(e, t) {
    const n = gt;
    Et[n(509)]({ THREE: e }), this[n(540)] = !![], this[n(524)] = ![], this[n(497)], this[n(574)], this[n(533)], this[n(512)], this[n(545)], this.sceneWrapper, this[n(583)], this[n(547)] = 0.05, this[n(569)] = 0.05, this[n(581)] = t, this[n(584)] = 0, this[n(510)] = 0, this.tiltY = 0, this[n(507)] = 512, this[n(585)] = new Array(this[n(507)])[n(508)](0), this[n(592)] = new Array(this[n(507)])[n(508)](0), this[n(528)] = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i[n(514)](navigator.userAgent), this[n(571)] = this[n(528)] ? 1.5 : 3, this[n(495)] = new Q.Vector2();
  }
  [K(489)](e, t, n, s, i, r) {
    const a = K;
    this.renderer = e, this.camera = t, this[a(501)] = n, this.pointerDownCallback = s, this[a(491)] = i, this[a(527)] = r, this[a(583)] = this[a(501)].getSceneZoneByIndex(this[a(584)]), this.setupGyro(), this[a(529)](), this.setupRaycaster(), this[a(580)]();
  }
  setupGyro() {
    const e = K;
    if (this.cameraParams[e(600)])
      try {
        let t = new Gyroscope({ frequency: 15 });
        t[e(505)](e(522), (n) => {
          const s = e;
          this[s(585)].push(t.y * 2), this.tiltYArr[s(521)](t.x * 2), this[s(510)] = vt[s(578)](this[s(585)]), this[s(553)] = vt[s(578)](this[s(592)]), this[s(585)][s(542)] > this[s(507)] && (this[s(585)][s(593)](), this[s(592)].pop());
        }), t[e(597)]();
      } catch (t) {
        console[e(576)]("The gryto motion sensor is not supported on this device.", t);
      }
  }
  setupCamera() {
    const e = K;
    this[e(533)].position.lerp(this[e(583)][e(536)], 1), this[e(533)][e(566)](this.activeSceneZone[e(515)]), this[e(579)](this.fitCameraOffset), this[e(574)] && this.controls[e(506)](), this.controls = new Et(this[e(533)], this.renderer.domElement), this[e(574)][e(554)] = 0.1, this[e(590)]();
  }
  [K(590)]() {
    const e = K;
    this[e(581)].orbit !== !![] && (this[e(574)][e(567)][e(562)] = Et[e(519)][e(552)], this[e(574)].touches[e(560)] = Et[e(519)][e(563)], this[e(574)][e(534)] = this[e(574)].azimuthAngle + this[e(569)], this.controls[e(551)] = this[e(574)][e(494)] - this.defaultRotationDistance, this[e(574)][e(541)] = this.controls[e(499)] + this.defaultRotationDistance, this.controls[e(558)] = this.controls[e(499)] - this[e(569)], this[e(574)][e(504)] = this[e(574)][e(561)] * 2, this.controls[e(595)] = this[e(574)].distance * 2, this[e(495)] = new Q[e(591)](this.controls[e(494)], this.controls[e(499)]));
  }
  [K(546)]() {
    const e = K;
    this[e(497)] && this[e(497)].dispose();
    const t = this.sceneWrapper[e(565)](this[e(583)].zone);
    this[e(497)] = new gi(t, this[e(533)], this.renderer[e(535)]), this[e(497)][e(505)]("pointerdown", this[e(557)][e(488)](this)), this[e(497)][e(505)](e(503), this[e(572)][e(488)](this)), this[e(497)][e(505)](e(492), this[e(500)][e(488)](this));
  }
  [K(594)]() {
    const e = K;
    this[e(584)] += 1, this[e(501)].wrappedSceneZones[e(542)] <= this[e(584)] && (this.activeZoneIndex = 0), this[e(587)](this[e(584)]);
  }
  changeSceneZoneByIndex(e, t = 0.01) {
    const n = K, s = this.sceneWrapper.getSceneZoneByIndex(e);
    this[n(584)] = e, this[n(538)](s, t);
  }
  [K(575)](e, t = 0.01) {
    const n = K, s = this[n(501)][n(523)](e);
    this[n(584)] = s.index, this.changeCameraZone(s.zoneBox, t);
  }
  [K(538)](e, t = 0.01) {
    const n = K;
    this[n(583)] = e;
    const s = this.fitCameraToZone(this[n(571)]);
    this.setInputActive(![]), this.orbitCameraTo(e[n(536)], e[n(515)], s, t)[n(502)](() => {
      const i = n;
      this[i(574)][i(588)](), this.resetControlsLimits(), this[i(599)](!![]);
    }), this[n(546)]();
  }
  fitCameraToZone(e = 3) {
    const t = K, n = Math[t(548)](this[t(583)][t(539)].x, this[t(583)][t(539)].y, this[t(583)][t(539)].z), s = n / (2 * Math[t(487)](Math.PI * this[t(533)][t(601)] / 360)), i = s / this[t(533)][t(556)], r = e * Math[t(548)](s, i), a = this.activeSceneZone.lookAtTarget[t(549)]().sub(this.camera.position)[t(543)]().multiplyScalar(r);
    return this[t(533)].position.copy(this.activeSceneZone[t(515)])[t(603)](a), this[t(533)][t(566)](this[t(583)][t(515)]), this[t(533)][t(496)][t(564)](this[t(583)][t(515)]);
  }
  [K(599)](e) {
    const t = K;
    this[t(540)] = e, this[t(497)][t(540)] = e, this[t(574)][t(540)] = e;
  }
  [K(485)](e) {
    const t = K;
    this[t(524)] = e, this[t(540)] = !e, this[t(497)][t(540)] = !e;
  }
  resetCamera(e = !![]) {
    const t = K;
    this[t(540)] && (this.moveCamera(this.activeSceneZone[t(536)], e), this[t(577)](this[t(583)][t(536)], this[t(583)][t(515)], e), this[t(574)].reset(e));
  }
  [K(589)](e = 0.05) {
    const t = K;
    this.controls[t(602)] = e * 50;
  }
  [K(516)](e, t = !![]) {
    const n = K;
    this[n(574)][n(531)](e, t);
  }
  [K(577)](e, t, n = !![]) {
    const s = K;
    return this[s(574)][s(577)](e.x, e.y, e.z, t.x, t.y, t.z, n);
  }
  [K(526)](e, t = !![]) {
    return this[K(574)].moveTo(e.x, e.y, e.z, !![]);
  }
  [K(490)](e) {
    const t = K;
    this.camera[t(511)] = e, this[t(533)][t(486)]();
  }
  [K(598)](e, t, n, s = 0.04, i = !![]) {
    const r = K;
    return e = e[r(603)](t)[r(498)](n)[r(544)](t), this[r(589)](s), this[r(574)][r(577)](e.x, e.y, e.z, t.x, t.y, t.z, i);
  }
  onPointerDown(e) {
    const t = K;
    e[t(518)] === null || !this.enabled || (this[t(497)][t(540)] = ![], this[t(545)](e[t(518)]));
  }
  [K(572)](e) {
    const t = K;
    e[t(518)] !== null && this[t(491)](e.object);
  }
  [K(500)](e) {
    const t = K;
    e[t(518)] !== null && this[t(527)](e[t(518)]);
  }
  rotateCamera() {
    const e = K;
    if (this[e(574)][e(570)] || this.cameraParams[e(582)])
      return;
    const t = this.controls[e(513)] == 32 || this[e(574)][e(513)] == 1;
    let n = -1, s = 1;
    !t && (this[e(581)][e(532)] && this[e(497)].pointer.x && (this[e(495)].x = this[e(497)][e(604)].x + this[e(574)][e(494)], this[e(495)].y = -this[e(497)].pointer.y + this.controls[e(499)], this[e(495)].x = vt.map(this.rotationTarget.x, this[e(574)].azimuthAngle + n, this.controls[e(494)] + s, this.controls.minAzimuthAngle, this.controls[e(534)]), this[e(495)].y = vt.map(this[e(495)].y, this.controls.polarAngle + n, this[e(574)][e(499)] + s, this[e(574)][e(558)], this[e(574)][e(541)])), this[e(528)] && this.cameraParams.gyro && (this.rotationTarget.x = this[e(510)] + this[e(574)][e(494)], this.rotationTarget.y = this[e(553)] + this[e(574)][e(499)]), this[e(574)][e(586)](this[e(495)].x, this[e(495)].y, ![]));
  }
  [K(555)](e) {
    const t = K;
    this.controls !== null && (this[t(497)][t(530)] = e * 1e3, !this[t(524)] && (this.rotateCamera(), this[t(574)].update(e)));
  }
}
const Se = nt;
function nt(u, e) {
  const t = Ht();
  return nt = function(n, s) {
    return n = n - 125, t[n];
  }, nt(u, e);
}
(function(u, e) {
  const t = nt, n = u();
  for (; []; )
    try {
      if (-parseInt(t(129)) / 1 * (parseInt(t(141)) / 2) + -parseInt(t(136)) / 3 + -parseInt(t(127)) / 4 + parseInt(t(137)) / 5 + parseInt(t(162)) / 6 * (parseInt(t(140)) / 7) + parseInt(t(128)) / 8 * (-parseInt(t(135)) / 9) + -parseInt(t(153)) / 10 * (-parseInt(t(126)) / 11) === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Ht, 181154);
function Ht() {
  const u = ["beforeend", "visibleSelector", "closeDynamicContent", "add", "contentContainer", "96330yqWaNn", "querySelector", "innerHTML", "iframe not found. Make sure this returns the correct element: document.getElementById(", "hiddenSelector", "history", "pushHashURL", "44319knDKtK", "574652bfFwKc", "775640lbruNA", "6aFQYJM", "setDynamicContent", "showDynamicHTML", "openLink", "addDynamicCloseButton", "classList", "9HvzEeB", "105801pxrTgB", "66660NnMYqp", "remove", "open", "98luoHzQ", "89524cXZkEG", "#XYZ3d-close-btn", "pushState", "hash", "loadingScreen", "XYZ3d-visible", "addEventListener", ");  ", "isOverlayActive", "error", '<div id="XYZ3d-close-btn" class="XYZ3d-close-btn"><span>✕</span', "setDynamicHTML", "1210asXROF", "getElementById", "click", ".XYZ3d-close"];
  return Ht = function() {
    return u;
  }, Ht();
}
class bi {
  constructor(e, t) {
    const n = nt;
    this.isOverlayActive = ![], this[n(166)] = "XYZ3d-hidden", this[n(158)] = n(146), this.contentContainer = document.getElementById(e), this[n(145)] = document[n(154)](t), !this[n(161)] && console.error(n(165), e, n(148)), !this[n(145)] && console[n(150)]("loadingScreen not found. Make sure this returns the correct element: document.getElementById(", t, ");  ");
  }
  showLoadingScreen(e, t = null) {
    const n = nt;
    this[n(149)] = e, e == !![] || this[n(145)].remove(), t != null && (this[n(145)].remove(), t());
  }
  [Se(125)](e = "", t = !![]) {
    const n = Se;
    window[n(167)][n(143)] && t ? window[n(167)][n(143)](null, null, e) : location[n(144)] = e;
  }
  [Se(131)](e = !![]) {
    const t = Se;
    this.isOverlayActive = e, e ? (this.contentContainer[t(134)][t(160)](this[t(158)]), this[t(161)].classList[t(138)](this.hiddenSelector)) : (this.contentContainer[t(134)][t(160)](this.hiddenSelector), this[t(161)][t(134)][t(138)](this.visibleSelector), this[t(125)]("", ![]));
  }
  setDynamicHTML(e) {
    const t = Se;
    this[t(161)][t(164)] = e;
  }
  addDynamicCloseButton(e) {
    const t = Se;
    let n = t(151);
    this[t(161)].insertAdjacentHTML(t(157), n), n = this.contentContainer[t(163)](t(142)), n[t(147)](t(155), () => {
      this[t(131)](![]), e();
    });
  }
  [Se(130)](e, t, n) {
    const s = Se;
    this[s(152)](e), this[s(133)](t), this[s(125)](n);
  }
  [Se(132)](e) {
    window[Se(139)](e);
  }
  [Se(159)](e) {
    const t = Se;
    this[t(161)].querySelector(t(156)) && (e(), this[t(161)].innerHTML = "");
  }
}
(function(u, e) {
  const t = _t, n = u();
  for (; []; )
    try {
      if (parseInt(t(433)) / 1 * (-parseInt(t(439)) / 2) + parseInt(t(418)) / 3 * (-parseInt(t(476)) / 4) + -parseInt(t(474)) / 5 + parseInt(t(432)) / 6 * (parseInt(t(414)) / 7) + parseInt(t(438)) / 8 * (-parseInt(t(434)) / 9) + parseInt(t(458)) / 10 + parseInt(t(430)) / 11 === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Gt, 965884);
function Gt() {
  const u = ["showLoadingScreen", "enabled", "element", "resize", "4688075uuytsI", "setPaused", "368xNfTYh", "AnimationMixer", "clipAction", "showDynamicHTML", "onHoverOverCallback", "nextSceneZone", "zeroSlopeAtStart", "history", "stopAllAction", "57547OalZid", "raycastTarget", "hash", "length", "62781NXvlJm", "onhashchange", "build", "reset", "NoBlending", "setDynamicContent", "setup", "onClick", "closeDynamicContent", "iframe", "update", "camera", "30250649MyfyLQ", "onHover", "1338dTeHNH", "4ipXbVX", "22023llhQpW", "animation", "DEBUG_xyz3d", "iframeID", "3224hNjWvM", "699258MFzDcJ", "round", "onPointerDownCallback", "openLink", "all", "content", "onProgressLoading", "getCamera", "getScene", "animations", "getRenderer", "onHoverOffCallback", "changeSceneZoneByName", "play", "getDelta", "resetCamera", "loadingScreenID", "LoopOnce", "Clock", "16300980qPJMOQ", "canvasID", "goToNextZone", "keys", "duration", "looping", "contentType", "setLoop", "clampWhenFinished", "nextScene", "domElements", "goToZone"];
  return Gt = function() {
    return u;
  }, Gt();
}
function _t(u, e) {
  const t = Gt();
  return _t = function(n, s) {
    return n = n - 408, t[n];
  }, _t(u, e);
}
class wi {
  constructor(e) {
    const t = _t;
    let n = this, s = null, i, r, a, c, h, d, f = null, m, T;
    window[t(436)] = e.debug;
    async function U() {
      const b = t;
      s = new mi(e[b(468)][b(459)], e[b(429)]), i = new _i(Q, e[b(429)]), r = new bi(e[b(468)][b(437)], e[b(468)][b(455)]), r[b(470)](!![]);
      const A = s[b(447)]();
      f = s[b(446)]();
      const j = s[b(449)]();
      c = await new li(A, j, e.jsonPath)[b(420)]((te, re, ne) => {
        const se = b;
        n[se(445)] && n.onProgressLoading(te, re, Math[se(440)](ne));
      }), m = new Q[b(457)](), a = new Q[b(477)](A);
      const G = c.getLoopingAnimations();
      return Z(b(463), G, !![]), i.init(j, f, c, H, L, W), r.showLoadingScreen(![], N), B(), M(), { camera: f, scene: A, renderer: j, sceneWrapper: c };
    }
    function B() {
      const b = t;
      window[b(419)] = function() {
        const A = b;
        location[A(416)] == "" ? r[A(426)](N) : window.history.back && window[A(412)].back();
      }, window.addEventListener(b(473), () => {
        N();
      }, ![]);
    }
    function M() {
      const b = t;
      requestAnimationFrame(M), !r.isOverlayActive && (T = m[b(453)](), a[b(428)](T), i[b(428)](T), s.render(), n.onUpdate && n.onUpdate(T));
    }
    function N(b = !![]) {
      const A = t;
      s[A(421)](), i[A(454)](b);
    }
    async function Z(b, A, j = ![], P = ![], G = null) {
      function te(ne) {
        const se = _t;
        return Object[se(461)](ne)[se(417)] === 0;
      }
      return te(A) === !![] || !(b in A) ? void 0 : R(A[b], G, j, P);
    }
    async function R(b, A = null, j = ![], P = ![]) {
      const G = t;
      let te = 0;
      for (let re = 0; re < b[G(417)]; re++) {
        const ne = b[re], se = a[G(478)](ne, A);
        se.blendMode = Q[G(422)], se.stop(), se[G(421)](), se.zeroSlopeAtEnd = !![], se[G(411)] = !![], !j && (se[G(465)](Q[G(456)]), se[G(421)]()), se[G(466)] = P, se[G(452)](), ne[G(462)] > te && (te = ne[G(462)]);
      }
      return new Promise((re) => setTimeout(() => {
        re();
      }, te * 1e3));
    }
    function L(b) {
      const A = t;
      b[A(415)] == null || !i[A(471)] || (Z(A(431), b.animations), n[A(409)] !== null && n.onHoverOverCallback(b));
    }
    function W(b) {
      const A = t;
      b.raycastTarget != null && n[A(450)] !== null && n[A(450)](b);
    }
    async function H(b) {
      const A = t;
      n[A(441)] !== null && n[A(441)](b), i[A(475)](!![]), a[A(413)]();
      const j = Z(A(429), b[A(448)], ![], ![], f), P = Z(A(425), b.animations, ![], ![]);
      await Promise[A(443)]([j, P]);
      const G = c.getLoopingAnimations();
      Z(A(463), G, !![]), z(b), i[A(475)](![]);
    }
    function z(b) {
      const A = t;
      switch (h = b[A(472)][A(464)], d = b[A(472)][A(444)], h) {
        case A(435):
          break;
        case A(460):
          i[A(467)](d);
          break;
        case A(469):
          i.changeSceneZoneByName(d);
          break;
        case A(427):
          r[A(423)](d, N), r[A(408)]();
          break;
        case "link":
          r[A(442)](d), N();
          break;
      }
      d = null, h = null;
    }
    n[t(451)] = function(b, A = 0.01) {
      i[t(451)](b, A);
    }, n[t(410)] = function() {
      i.nextScene();
    }, n[t(424)] = U, n.reset = N, n[t(441)] = null, n.onHoverOverCallback = null, n[t(450)] = null, n.onUpdate = null, n[t(445)] = null;
  }
}
export {
  wi as default
};
