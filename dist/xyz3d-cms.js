import * as Q from "three";
import { TrianglesDrawMode as Es, TriangleFanDrawMode as Qt, TriangleStripDrawMode as Rn, Loader as In, LoaderUtils as qt, FileLoader as It, Color as Me, SpotLight as Ss, PointLight as vs, DirectionalLight as Rs, MeshBasicMaterial as qe, sRGBEncoding as mt, MeshPhysicalMaterial as We, Vector2 as Re, Matrix4 as Mt, Vector3 as Le, Quaternion as Mn, InstancedMesh as Is, Object3D as Cn, TextureLoader as Ms, ImageBitmapLoader as Cs, BufferAttribute as dt, InterleavedBuffer as Ls, InterleavedBufferAttribute as Ns, LinearFilter as nt, LinearMipmapLinearFilter as Ln, RepeatWrapping as Jt, PointsMaterial as ks, Material as Zt, LineBasicMaterial as Ds, MeshStandardMaterial as Nn, DoubleSide as Os, PropertyBinding as Us, BufferGeometry as on, SkinnedMesh as Ps, Mesh as kn, LineSegments as Fs, Line as Bs, LineLoop as Hs, Points as Gs, Group as jt, PerspectiveCamera as zs, MathUtils as Zs, OrthographicCamera as Dn, Skeleton as js, InterpolateLinear as On, AnimationClip as Vs, Bone as Xs, NearestFilter as Ks, NearestMipmapNearestFilter as Ws, LinearMipmapNearestFilter as Ys, NearestMipmapLinearFilter as Qs, ClampToEdgeWrapping as qs, MirroredRepeatWrapping as Js, InterpolateDiscrete as $s, FrontSide as er, Texture as mn, VectorKeyframeTrack as tr, QuaternionKeyframeTrack as gn, NumberKeyframeTrack as nr, Box3 as sr, Sphere as rr, Interpolant as ir, SRGBColorSpace as bn, LinearSRGBColorSpace as or, DataTextureLoader as Un, HalfFloatType as ze, FloatType as et, DataUtils as Je, LinearEncoding as $t, RGBAFormat as ar, RedFormat as cr, Float32BufferAttribute as Pn, WebGLRenderTarget as Rt, UniformsUtils as en, ShaderMaterial as $e, AdditiveBlending as lr, Clock as ur } from "three";
import Et from "camera-controls";
function _n(h, e) {
  if (e === Es)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), h;
  if (e === Qt || e === Rn) {
    let t = h.getIndex();
    if (t === null) {
      const r = [], a = h.getAttribute("position");
      if (a !== void 0) {
        for (let c = 0; c < a.count; c++)
          r.push(c);
        h.setIndex(r), t = h.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), h;
    }
    const n = t.count - 2, s = [];
    if (e === Qt)
      for (let r = 1; r <= n; r++)
        s.push(t.getX(0)), s.push(t.getX(r)), s.push(t.getX(r + 1));
    else
      for (let r = 0; r < n; r++)
        r % 2 === 0 ? (s.push(t.getX(r)), s.push(t.getX(r + 1)), s.push(t.getX(r + 2))) : (s.push(t.getX(r + 2)), s.push(t.getX(r + 1)), s.push(t.getX(r)));
    s.length / 3 !== n && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const i = h.clone();
    return i.setIndex(s), i.clearGroups(), i;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), h;
}
class hr extends In {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new mr(t);
    }), this.register(function(t) {
      return new yr(t);
    }), this.register(function(t) {
      return new Er(t);
    }), this.register(function(t) {
      return new Sr(t);
    }), this.register(function(t) {
      return new br(t);
    }), this.register(function(t) {
      return new _r(t);
    }), this.register(function(t) {
      return new Tr(t);
    }), this.register(function(t) {
      return new Ar(t);
    }), this.register(function(t) {
      return new pr(t);
    }), this.register(function(t) {
      return new wr(t);
    }), this.register(function(t) {
      return new gr(t);
    }), this.register(function(t) {
      return new fr(t);
    }), this.register(function(t) {
      return new vr(t);
    }), this.register(function(t) {
      return new Rr(t);
    });
  }
  load(e, t, n, s) {
    const i = this;
    let r;
    this.resourcePath !== "" ? r = this.resourcePath : this.path !== "" ? r = this.path : r = qt.extractUrlBase(e), this.manager.itemStart(e);
    const a = function(u) {
      s ? s(u) : console.error(u), i.manager.itemError(e), i.manager.itemEnd(e);
    }, c = new It(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(e, function(u) {
      try {
        i.parse(u, r, function(d) {
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
      if (c.decode(new Uint8Array(e, 0, 4)) === Fn) {
        try {
          r[q.KHR_BINARY_GLTF] = new Ir(e);
        } catch (f) {
          s && s(f);
          return;
        }
        i = JSON.parse(r[q.KHR_BINARY_GLTF].content);
      } else
        i = JSON.parse(c.decode(e));
    else
      i = e;
    if (i.asset === void 0 || i.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const u = new Gr(i, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    u.fileLoader.setRequestHeader(this.requestHeader);
    for (let d = 0; d < this.pluginCallbacks.length; d++) {
      const f = this.pluginCallbacks[d](u);
      a[f.name] = f, r[f.name] = !0;
    }
    if (i.extensionsUsed)
      for (let d = 0; d < i.extensionsUsed.length; ++d) {
        const f = i.extensionsUsed[d], m = i.extensionsRequired || [];
        switch (f) {
          case q.KHR_MATERIALS_UNLIT:
            r[f] = new dr();
            break;
          case q.KHR_DRACO_MESH_COMPRESSION:
            r[f] = new Mr(i, this.dracoLoader);
            break;
          case q.KHR_TEXTURE_TRANSFORM:
            r[f] = new Cr();
            break;
          case q.KHR_MESH_QUANTIZATION:
            r[f] = new Lr();
            break;
          default:
            m.indexOf(f) >= 0 && a[f] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + f + '".');
        }
      }
    u.setExtensions(r), u.setPlugins(a), u.parse(n, s);
  }
  parseAsync(e, t) {
    const n = this;
    return new Promise(function(s, i) {
      n.parse(e, t, s, i);
    });
  }
}
function xr() {
  let h = {};
  return {
    get: function(e) {
      return h[e];
    },
    add: function(e, t) {
      h[e] = t;
    },
    remove: function(e) {
      delete h[e];
    },
    removeAll: function() {
      h = {};
    }
  };
}
const q = {
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
class fr {
  constructor(e) {
    this.parser = e, this.name = q.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
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
    let u;
    const d = new Me(16777215);
    c.color !== void 0 && d.fromArray(c.color);
    const f = c.range !== void 0 ? c.range : 0;
    switch (c.type) {
      case "directional":
        u = new Rs(d), u.target.position.set(0, 0, -1), u.add(u.target);
        break;
      case "point":
        u = new vs(d), u.distance = f;
        break;
      case "spot":
        u = new Ss(d), u.distance = f, c.spot = c.spot || {}, c.spot.innerConeAngle = c.spot.innerConeAngle !== void 0 ? c.spot.innerConeAngle : 0, c.spot.outerConeAngle = c.spot.outerConeAngle !== void 0 ? c.spot.outerConeAngle : Math.PI / 4, u.angle = c.spot.outerConeAngle, u.penumbra = 1 - c.spot.innerConeAngle / c.spot.outerConeAngle, u.target.position.set(0, 0, -1), u.add(u.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + c.type);
    }
    return u.position.set(0, 0, 0), u.decay = 2, Ge(u, c), c.intensity !== void 0 && (u.intensity = c.intensity), u.name = t.createUniqueName(c.name || "light_" + e), s = Promise.resolve(u), t.cache.add(n, s), s;
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
class dr {
  constructor() {
    this.name = q.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return qe;
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
      i.baseColorTexture !== void 0 && s.push(n.assignTexture(e, "map", i.baseColorTexture, mt));
    }
    return Promise.all(s);
  }
}
class pr {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = s.extensions[this.name].emissiveStrength;
    return i !== void 0 && (t.emissiveIntensity = i), Promise.resolve();
  }
}
class mr {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : We;
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
class gr {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : We;
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
    this.parser = e, this.name = q.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : We;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [];
    t.sheenColor = new Me(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const r = s.extensions[this.name];
    return r.sheenColorFactor !== void 0 && t.sheenColor.fromArray(r.sheenColorFactor), r.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = r.sheenRoughnessFactor), r.sheenColorTexture !== void 0 && i.push(n.assignTexture(t, "sheenColorMap", r.sheenColorTexture, mt)), r.sheenRoughnessTexture !== void 0 && i.push(n.assignTexture(t, "sheenRoughnessMap", r.sheenRoughnessTexture)), Promise.all(i);
  }
}
class _r {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : We;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], r = s.extensions[this.name];
    return r.transmissionFactor !== void 0 && (t.transmission = r.transmissionFactor), r.transmissionTexture !== void 0 && i.push(n.assignTexture(t, "transmissionMap", r.transmissionTexture)), Promise.all(i);
  }
}
class Tr {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : We;
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
class Ar {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : We;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = s.extensions[this.name];
    return t.ior = i.ior !== void 0 ? i.ior : 1.5, Promise.resolve();
  }
}
class wr {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : We;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], r = s.extensions[this.name];
    t.specularIntensity = r.specularFactor !== void 0 ? r.specularFactor : 1, r.specularTexture !== void 0 && i.push(n.assignTexture(t, "specularIntensityMap", r.specularTexture));
    const a = r.specularColorFactor || [1, 1, 1];
    return t.specularColor = new Me(a[0], a[1], a[2]), r.specularColorTexture !== void 0 && i.push(n.assignTexture(t, "specularColorMap", r.specularColorTexture, mt)), Promise.all(i);
  }
}
class yr {
  constructor(e) {
    this.parser = e, this.name = q.KHR_TEXTURE_BASISU;
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
class Er {
  constructor(e) {
    this.parser = e, this.name = q.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, s = n.json, i = s.textures[e];
    if (!i.extensions || !i.extensions[t])
      return null;
    const r = i.extensions[t], a = s.images[r.source];
    let c = n.textureLoader;
    if (a.uri) {
      const u = n.options.manager.getHandler(a.uri);
      u !== null && (c = u);
    }
    return this.detectSupport().then(function(u) {
      if (u)
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
class Sr {
  constructor(e) {
    this.parser = e, this.name = q.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, s = n.json, i = s.textures[e];
    if (!i.extensions || !i.extensions[t])
      return null;
    const r = i.extensions[t], a = s.images[r.source];
    let c = n.textureLoader;
    if (a.uri) {
      const u = n.options.manager.getHandler(a.uri);
      u !== null && (c = u);
    }
    return this.detectSupport().then(function(u) {
      if (u)
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
class vr {
  constructor(e) {
    this.name = q.EXT_MESHOPT_COMPRESSION, this.parser = e;
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
        const c = s.byteOffset || 0, u = s.byteLength || 0, d = s.count, f = s.byteStride, m = new Uint8Array(a, c, u);
        return r.decodeGltfBufferAsync ? r.decodeGltfBufferAsync(d, f, m, s.mode, s.filter).then(function(A) {
          return A.buffer;
        }) : r.ready.then(function() {
          const A = new ArrayBuffer(d * f);
          return r.decodeGltfBuffer(new Uint8Array(A), d, f, m, s.mode, s.filter), A;
        });
      });
    } else
      return null;
  }
}
class Rr {
  constructor(e) {
    this.name = q.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, n = t.nodes[e];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0)
      return null;
    const s = t.meshes[n.mesh];
    for (const u of s.primitives)
      if (u.mode !== ve.TRIANGLES && u.mode !== ve.TRIANGLE_STRIP && u.mode !== ve.TRIANGLE_FAN && u.mode !== void 0)
        return null;
    const r = n.extensions[this.name].attributes, a = [], c = {};
    for (const u in r)
      a.push(this.parser.getDependency("accessor", r[u]).then((d) => (c[u] = d, c[u])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((u) => {
      const d = u.pop(), f = d.isGroup ? d.children : [d], m = u[0].count, A = [];
      for (const U of f) {
        const B = new Mt(), M = new Le(), N = new Mn(), z = new Le(1, 1, 1), R = new Is(U.geometry, U.material, m);
        for (let L = 0; L < m; L++)
          c.TRANSLATION && M.fromBufferAttribute(c.TRANSLATION, L), c.ROTATION && N.fromBufferAttribute(c.ROTATION, L), c.SCALE && z.fromBufferAttribute(c.SCALE, L), R.setMatrixAt(L, B.compose(M, N, z));
        for (const L in c)
          L !== "TRANSLATION" && L !== "ROTATION" && L !== "SCALE" && U.geometry.setAttribute(L, c[L]);
        Cn.prototype.copy.call(R, U), R.frustumCulled = !1, this.parser.assignFinalMaterial(R), A.push(R);
      }
      return d.isGroup ? (d.clear(), d.add(...A), d) : A[0];
    }));
  }
}
const Fn = "glTF", ht = 12, Tn = { JSON: 1313821514, BIN: 5130562 };
class Ir {
  constructor(e) {
    this.name = q.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, ht), n = new TextDecoder();
    if (this.header = {
      magic: n.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== Fn)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - ht, i = new DataView(e, ht);
    let r = 0;
    for (; r < s; ) {
      const a = i.getUint32(r, !0);
      r += 4;
      const c = i.getUint32(r, !0);
      if (r += 4, c === Tn.JSON) {
        const u = new Uint8Array(e, ht + r, a);
        this.content = n.decode(u);
      } else if (c === Tn.BIN) {
        const u = ht + r;
        this.body = e.slice(u, u + a);
      }
      r += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Mr {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = q.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const n = this.json, s = this.dracoLoader, i = e.extensions[this.name].bufferView, r = e.extensions[this.name].attributes, a = {}, c = {}, u = {};
    for (const d in r) {
      const f = tn[d] || d.toLowerCase();
      a[f] = r[d];
    }
    for (const d in e.attributes) {
      const f = tn[d] || d.toLowerCase();
      if (r[d] !== void 0) {
        const m = n.accessors[e.attributes[d]], A = tt[m.componentType];
        u[f] = A.name, c[f] = m.normalized === !0;
      }
    }
    return t.getDependency("bufferView", i).then(function(d) {
      return new Promise(function(f) {
        s.decodeDracoFile(d, function(m) {
          for (const A in m.attributes) {
            const U = m.attributes[A], B = c[A];
            B !== void 0 && (U.normalized = B);
          }
          f(m);
        }, a, u);
      });
    });
  }
}
class Cr {
  constructor() {
    this.name = q.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return t.texCoord !== void 0 && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Lr {
  constructor() {
    this.name = q.KHR_MESH_QUANTIZATION;
  }
}
class Bn extends ir {
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
    const i = this.resultBuffer, r = this.sampleValues, a = this.valueSize, c = a * 2, u = a * 3, d = s - t, f = (n - t) / d, m = f * f, A = m * f, U = e * u, B = U - u, M = -2 * A + 3 * m, N = A - m, z = 1 - M, R = N - m + f;
    for (let L = 0; L !== a; L++) {
      const W = r[B + L + a], H = r[B + L + c] * d, G = r[U + L + a], _ = r[U + L] * d;
      i[L] = z * W + R * H + M * G + N * _;
    }
    return i;
  }
}
const Nr = new Mn();
class kr extends Bn {
  interpolate_(e, t, n, s) {
    const i = super.interpolate_(e, t, n, s);
    return Nr.fromArray(i).normalize().toArray(i), i;
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
}, tt = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, An = {
  9728: Ks,
  9729: nt,
  9984: Ws,
  9985: Ys,
  9986: Qs,
  9987: Ln
}, wn = {
  33071: qs,
  33648: Js,
  10497: Jt
}, Vt = {
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
}, Fe = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Dr = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: On,
  STEP: $s
}, Xt = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Or(h) {
  return h.DefaultMaterial === void 0 && (h.DefaultMaterial = new Nn({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: er
  })), h.DefaultMaterial;
}
function xt(h, e, t) {
  for (const n in t.extensions)
    h[n] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[n] = t.extensions[n]);
}
function Ge(h, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(h.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Ur(h, e, t) {
  let n = !1, s = !1, i = !1;
  for (let u = 0, d = e.length; u < d; u++) {
    const f = e[u];
    if (f.POSITION !== void 0 && (n = !0), f.NORMAL !== void 0 && (s = !0), f.COLOR_0 !== void 0 && (i = !0), n && s && i)
      break;
  }
  if (!n && !s && !i)
    return Promise.resolve(h);
  const r = [], a = [], c = [];
  for (let u = 0, d = e.length; u < d; u++) {
    const f = e[u];
    if (n) {
      const m = f.POSITION !== void 0 ? t.getDependency("accessor", f.POSITION) : h.attributes.position;
      r.push(m);
    }
    if (s) {
      const m = f.NORMAL !== void 0 ? t.getDependency("accessor", f.NORMAL) : h.attributes.normal;
      a.push(m);
    }
    if (i) {
      const m = f.COLOR_0 !== void 0 ? t.getDependency("accessor", f.COLOR_0) : h.attributes.color;
      c.push(m);
    }
  }
  return Promise.all([
    Promise.all(r),
    Promise.all(a),
    Promise.all(c)
  ]).then(function(u) {
    const d = u[0], f = u[1], m = u[2];
    return n && (h.morphAttributes.position = d), s && (h.morphAttributes.normal = f), i && (h.morphAttributes.color = m), h.morphTargetsRelative = !0, h;
  });
}
function Pr(h, e) {
  if (h.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, n = e.weights.length; t < n; t++)
      h.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (h.morphTargetInfluences.length === t.length) {
      h.morphTargetDictionary = {};
      for (let n = 0, s = t.length; n < s; n++)
        h.morphTargetDictionary[t[n]] = n;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Fr(h) {
  const e = h.extensions && h.extensions[q.KHR_DRACO_MESH_COMPRESSION];
  let t;
  return e ? t = "draco:" + e.bufferView + ":" + e.indices + ":" + yn(e.attributes) : t = h.indices + ":" + yn(h.attributes) + ":" + h.mode, t;
}
function yn(h) {
  let e = "";
  const t = Object.keys(h).sort();
  for (let n = 0, s = t.length; n < s; n++)
    e += t[n] + ":" + h[t[n]] + ";";
  return e;
}
function nn(h) {
  switch (h) {
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
function Br(h) {
  return h.search(/\.jpe?g($|\?)/i) > 0 || h.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : h.search(/\.webp($|\?)/i) > 0 || h.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const Hr = new Mt();
class Gr {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new xr(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, s = !1, i = -1;
    typeof navigator < "u" && (n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, s = navigator.userAgent.indexOf("Firefox") > -1, i = s ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || n || s && i < 98 ? this.textureLoader = new Ms(this.options.manager) : this.textureLoader = new Cs(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new It(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
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
      xt(i, a, s), Ge(a, s), Promise.all(n._invokeAll(function(c) {
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
      for (const [u, d] of r.children.entries())
        i(d, a.children[u]);
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
      return Promise.resolve(this.extensions[q.KHR_BINARY_GLTF].body);
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
      const r = Vt[s.type], a = tt[s.componentType], c = s.normalized === !0, u = new a(s.count * r);
      return Promise.resolve(new dt(u, r, c));
    }
    const i = [];
    return s.bufferView !== void 0 ? i.push(this.getDependency("bufferView", s.bufferView)) : i.push(null), s.sparse !== void 0 && (i.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(i).then(function(r) {
      const a = r[0], c = Vt[s.type], u = tt[s.componentType], d = u.BYTES_PER_ELEMENT, f = d * c, m = s.byteOffset || 0, A = s.bufferView !== void 0 ? n.bufferViews[s.bufferView].byteStride : void 0, U = s.normalized === !0;
      let B, M;
      if (A && A !== f) {
        const N = Math.floor(m / A), z = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + N + ":" + s.count;
        let R = t.cache.get(z);
        R || (B = new u(a, N * A, s.count * A / d), R = new Ls(B, A / d), t.cache.add(z, R)), M = new Ns(R, c, m % A / d, U);
      } else
        a === null ? B = new u(s.count * c) : B = new u(a, m, s.count * c), M = new dt(B, c, U);
      if (s.sparse !== void 0) {
        const N = Vt.SCALAR, z = tt[s.sparse.indices.componentType], R = s.sparse.indices.byteOffset || 0, L = s.sparse.values.byteOffset || 0, W = new z(r[1], R, s.sparse.count * N), H = new u(r[2], L, s.sparse.count * c);
        a !== null && (M = new dt(M.array.slice(), M.itemSize, M.normalized));
        for (let G = 0, _ = W.length; G < _; G++) {
          const T = W[G];
          if (M.setX(T, H[G * c]), c >= 2 && M.setY(T, H[G * c + 1]), c >= 3 && M.setZ(T, H[G * c + 2]), c >= 4 && M.setW(T, H[G * c + 3]), c >= 5)
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
    const u = this.loadImageSource(t, n).then(function(d) {
      d.flipY = !1, d.name = r.name || a.name || "";
      const m = (i.samplers || {})[r.sampler] || {};
      return d.magFilter = An[m.magFilter] || nt, d.minFilter = An[m.minFilter] || Ln, d.wrapS = wn[m.wrapS] || Jt, d.wrapT = wn[m.wrapT] || Jt, s.associations.set(d, { textures: e }), d;
    }).catch(function() {
      return null;
    });
    return this.textureCache[c] = u, u;
  }
  loadImageSource(e, t) {
    const n = this, s = this.json, i = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((f) => f.clone());
    const r = s.images[e], a = self.URL || self.webkitURL;
    let c = r.uri || "", u = !1;
    if (r.bufferView !== void 0)
      c = n.getDependency("bufferView", r.bufferView).then(function(f) {
        u = !0;
        const m = new Blob([f], { type: r.mimeType });
        return c = a.createObjectURL(m), c;
      });
    else if (r.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const d = Promise.resolve(c).then(function(f) {
      return new Promise(function(m, A) {
        let U = m;
        t.isImageBitmapLoader === !0 && (U = function(B) {
          const M = new mn(B);
          M.needsUpdate = !0, m(M);
        }), t.load(qt.resolveURL(f, i.path), U, void 0, A);
      });
    }).then(function(f) {
      return u === !0 && a.revokeObjectURL(c), f.userData.mimeType = r.mimeType || Br(r.uri), f;
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
      if (n.texCoord !== void 0 && n.texCoord != 0 && !(t === "aoMap" && n.texCoord == 1) && console.warn("THREE.GLTFLoader: Custom UV set " + n.texCoord + " for texture " + t + " not yet supported."), i.extensions[q.KHR_TEXTURE_TRANSFORM]) {
        const a = n.extensions !== void 0 ? n.extensions[q.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const c = i.associations.get(r);
          r = i.extensions[q.KHR_TEXTURE_TRANSFORM].extendTexture(r, a), i.associations.set(r, c);
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
      c || (c = new Ds(), Zt.prototype.copy.call(c, n), c.color.copy(n.color), this.cache.add(a, c)), n = c;
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
    return Nn;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, n = this.json, s = this.extensions, i = n.materials[e];
    let r;
    const a = {}, c = i.extensions || {}, u = [];
    if (c[q.KHR_MATERIALS_UNLIT]) {
      const f = s[q.KHR_MATERIALS_UNLIT];
      r = f.getMaterialType(), u.push(f.extendParams(a, i, t));
    } else {
      const f = i.pbrMetallicRoughness || {};
      if (a.color = new Me(1, 1, 1), a.opacity = 1, Array.isArray(f.baseColorFactor)) {
        const m = f.baseColorFactor;
        a.color.fromArray(m), a.opacity = m[3];
      }
      f.baseColorTexture !== void 0 && u.push(t.assignTexture(a, "map", f.baseColorTexture, mt)), a.metalness = f.metallicFactor !== void 0 ? f.metallicFactor : 1, a.roughness = f.roughnessFactor !== void 0 ? f.roughnessFactor : 1, f.metallicRoughnessTexture !== void 0 && (u.push(t.assignTexture(a, "metalnessMap", f.metallicRoughnessTexture)), u.push(t.assignTexture(a, "roughnessMap", f.metallicRoughnessTexture))), r = this._invokeOne(function(m) {
        return m.getMaterialType && m.getMaterialType(e);
      }), u.push(Promise.all(this._invokeAll(function(m) {
        return m.extendMaterialParams && m.extendMaterialParams(e, a);
      })));
    }
    i.doubleSided === !0 && (a.side = Os);
    const d = i.alphaMode || Xt.OPAQUE;
    if (d === Xt.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, d === Xt.MASK && (a.alphaTest = i.alphaCutoff !== void 0 ? i.alphaCutoff : 0.5)), i.normalTexture !== void 0 && r !== qe && (u.push(t.assignTexture(a, "normalMap", i.normalTexture)), a.normalScale = new Re(1, 1), i.normalTexture.scale !== void 0)) {
      const f = i.normalTexture.scale;
      a.normalScale.set(f, f);
    }
    return i.occlusionTexture !== void 0 && r !== qe && (u.push(t.assignTexture(a, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && r !== qe && (a.emissive = new Me().fromArray(i.emissiveFactor)), i.emissiveTexture !== void 0 && r !== qe && u.push(t.assignTexture(a, "emissiveMap", i.emissiveTexture, mt)), Promise.all(u).then(function() {
      const f = new r(a);
      return i.name && (f.name = i.name), Ge(f, i), t.associations.set(f, { materials: e }), i.extensions && xt(s, f, i), f;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(e) {
    const t = Us.sanitizeNodeName(e || "");
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
      return n[q.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(c) {
        return En(c, a, t);
      });
    }
    const r = [];
    for (let a = 0, c = e.length; a < c; a++) {
      const u = e[a], d = Fr(u), f = s[d];
      if (f)
        r.push(f.promise);
      else {
        let m;
        u.extensions && u.extensions[q.KHR_DRACO_MESH_COMPRESSION] ? m = i(u) : m = En(new on(), u, t), s[d] = { primitive: u, promise: m }, r.push(m);
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
    for (let c = 0, u = r.length; c < u; c++) {
      const d = r[c].material === void 0 ? Or(this.cache) : this.getDependency("material", r[c].material);
      a.push(d);
    }
    return a.push(t.loadGeometries(r)), Promise.all(a).then(function(c) {
      const u = c.slice(0, c.length - 1), d = c[c.length - 1], f = [];
      for (let A = 0, U = d.length; A < U; A++) {
        const B = d[A], M = r[A];
        let N;
        const z = u[A];
        if (M.mode === ve.TRIANGLES || M.mode === ve.TRIANGLE_STRIP || M.mode === ve.TRIANGLE_FAN || M.mode === void 0)
          N = i.isSkinnedMesh === !0 ? new Ps(B, z) : new kn(B, z), N.isSkinnedMesh === !0 && N.normalizeSkinWeights(), M.mode === ve.TRIANGLE_STRIP ? N.geometry = _n(N.geometry, Rn) : M.mode === ve.TRIANGLE_FAN && (N.geometry = _n(N.geometry, Qt));
        else if (M.mode === ve.LINES)
          N = new Fs(B, z);
        else if (M.mode === ve.LINE_STRIP)
          N = new Bs(B, z);
        else if (M.mode === ve.LINE_LOOP)
          N = new Hs(B, z);
        else if (M.mode === ve.POINTS)
          N = new Gs(B, z);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + M.mode);
        Object.keys(N.geometry.morphAttributes).length > 0 && Pr(N, i), N.name = t.createUniqueName(i.name || "mesh_" + e), Ge(N, i), M.extensions && xt(s, N, M), t.assignFinalMaterial(N), f.push(N);
      }
      for (let A = 0, U = f.length; A < U; A++)
        t.associations.set(f[A], {
          meshes: e,
          primitives: A
        });
      if (f.length === 1)
        return f[0];
      const m = new jt();
      t.associations.set(m, { meshes: e });
      for (let A = 0, U = f.length; A < U; A++)
        m.add(f[A]);
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
    return n.type === "perspective" ? t = new zs(Zs.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : n.type === "orthographic" && (t = new Dn(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), n.name && (t.name = this.createUniqueName(n.name)), Ge(t, n), Promise.resolve(t);
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
      for (let u = 0, d = r.length; u < d; u++) {
        const f = r[u];
        if (f) {
          a.push(f);
          const m = new Mt();
          i !== null && m.fromArray(i.array, u * 16), c.push(m);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[u]);
      }
      return new js(a, c);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const n = this.json.animations[e], s = [], i = [], r = [], a = [], c = [];
    for (let u = 0, d = n.channels.length; u < d; u++) {
      const f = n.channels[u], m = n.samplers[f.sampler], A = f.target, U = A.node, B = n.parameters !== void 0 ? n.parameters[m.input] : m.input, M = n.parameters !== void 0 ? n.parameters[m.output] : m.output;
      s.push(this.getDependency("node", U)), i.push(this.getDependency("accessor", B)), r.push(this.getDependency("accessor", M)), a.push(m), c.push(A);
    }
    return Promise.all([
      Promise.all(s),
      Promise.all(i),
      Promise.all(r),
      Promise.all(a),
      Promise.all(c)
    ]).then(function(u) {
      const d = u[0], f = u[1], m = u[2], A = u[3], U = u[4], B = [];
      for (let N = 0, z = d.length; N < z; N++) {
        const R = d[N], L = f[N], W = m[N], H = A[N], G = U[N];
        if (R === void 0)
          continue;
        R.updateMatrix();
        let _;
        switch (Fe[G.path]) {
          case Fe.weights:
            _ = nr;
            break;
          case Fe.rotation:
            _ = gn;
            break;
          case Fe.position:
          case Fe.scale:
          default:
            _ = tr;
            break;
        }
        const T = R.name ? R.name : R.uuid, Z = H.interpolation !== void 0 ? Dr[H.interpolation] : On, P = [];
        Fe[G.path] === Fe.weights ? R.traverse(function(ee) {
          ee.morphTargetInfluences && P.push(ee.name ? ee.name : ee.uuid);
        }) : P.push(T);
        let j = W.array;
        if (W.normalized) {
          const ee = nn(j.constructor), ne = new Float32Array(j.length);
          for (let te = 0, se = j.length; te < se; te++)
            ne[te] = j[te] * ee;
          j = ne;
        }
        for (let ee = 0, ne = P.length; ee < ne; ee++) {
          const te = new _(
            P[ee] + "." + Fe[G.path],
            L.array,
            j,
            Z
          );
          H.interpolation === "CUBICSPLINE" && (te.createInterpolant = function(de) {
            const pe = this instanceof gn ? kr : Bn;
            return new pe(this.times, this.values, this.getValueSize() / 3, de);
          }, te.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0), B.push(te);
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
          for (let c = 0, u = s.weights.length; c < u; c++)
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
    for (let u = 0, d = a.length; u < d; u++)
      r.push(n.getDependency("node", a[u]));
    const c = s.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", s.skin);
    return Promise.all([
      i,
      Promise.all(r),
      c
    ]).then(function(u) {
      const d = u[0], f = u[1], m = u[2];
      m !== null && d.traverse(function(A) {
        A.isSkinnedMesh && A.bind(m, Hr);
      });
      for (let A = 0, U = f.length; A < U; A++)
        d.add(f[A]);
      return d;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, n = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const i = t.nodes[e], r = i.name ? s.createUniqueName(i.name) : "", a = [], c = s._invokeOne(function(u) {
      return u.createNodeMesh && u.createNodeMesh(e);
    });
    return c && a.push(c), i.camera !== void 0 && a.push(s.getDependency("camera", i.camera).then(function(u) {
      return s._getNodeRef(s.cameraCache, i.camera, u);
    })), s._invokeAll(function(u) {
      return u.createNodeAttachment && u.createNodeAttachment(e);
    }).forEach(function(u) {
      a.push(u);
    }), this.nodeCache[e] = Promise.all(a).then(function(u) {
      let d;
      if (i.isBone === !0 ? d = new Xs() : u.length > 1 ? d = new jt() : u.length === 1 ? d = u[0] : d = new Cn(), d !== u[0])
        for (let f = 0, m = u.length; f < m; f++)
          d.add(u[f]);
      if (i.name && (d.userData.name = i.name, d.name = r), Ge(d, i), i.extensions && xt(n, d, i), i.matrix !== void 0) {
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
    n.name && (i.name = s.createUniqueName(n.name)), Ge(i, n), n.extensions && xt(t, i, n);
    const r = n.nodes || [], a = [];
    for (let c = 0, u = r.length; c < u; c++)
      a.push(s.getDependency("node", r[c]));
    return Promise.all(a).then(function(c) {
      for (let d = 0, f = c.length; d < f; d++)
        i.add(c[d]);
      const u = (d) => {
        const f = /* @__PURE__ */ new Map();
        for (const [m, A] of s.associations)
          (m instanceof Zt || m instanceof mn) && f.set(m, A);
        return d.traverse((m) => {
          const A = s.associations.get(m);
          A != null && f.set(m, A);
        }), f;
      };
      return s.associations = u(i), i;
    });
  }
}
function zr(h, e, t) {
  const n = e.attributes, s = new sr();
  if (n.POSITION !== void 0) {
    const a = t.json.accessors[n.POSITION], c = a.min, u = a.max;
    if (c !== void 0 && u !== void 0) {
      if (s.set(
        new Le(c[0], c[1], c[2]),
        new Le(u[0], u[1], u[2])
      ), a.normalized) {
        const d = nn(tt[a.componentType]);
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
    for (let u = 0, d = i.length; u < d; u++) {
      const f = i[u];
      if (f.POSITION !== void 0) {
        const m = t.json.accessors[f.POSITION], A = m.min, U = m.max;
        if (A !== void 0 && U !== void 0) {
          if (c.setX(Math.max(Math.abs(A[0]), Math.abs(U[0]))), c.setY(Math.max(Math.abs(A[1]), Math.abs(U[1]))), c.setZ(Math.max(Math.abs(A[2]), Math.abs(U[2]))), m.normalized) {
            const B = nn(tt[m.componentType]);
            c.multiplyScalar(B);
          }
          a.max(c);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    s.expandByVector(a);
  }
  h.boundingBox = s;
  const r = new rr();
  s.getCenter(r.center), r.radius = s.min.distanceTo(s.max) / 2, h.boundingSphere = r;
}
function En(h, e, t) {
  const n = e.attributes, s = [];
  function i(r, a) {
    return t.getDependency("accessor", r).then(function(c) {
      h.setAttribute(a, c);
    });
  }
  for (const r in n) {
    const a = tn[r] || r.toLowerCase();
    a in h.attributes || s.push(i(n[r], a));
  }
  if (e.indices !== void 0 && !h.index) {
    const r = t.getDependency("accessor", e.indices).then(function(a) {
      h.setIndex(a);
    });
    s.push(r);
  }
  return Ge(h, e), zr(h, e, t), Promise.all(s).then(function() {
    return e.targets !== void 0 ? Ur(h, e.targets, t) : h;
  });
}
const Kt = /* @__PURE__ */ new WeakMap();
class Zr extends In {
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
    this.decodeDracoFile(e, t, null, null, bn).catch(n);
  }
  decodeDracoFile(e, t, n, s, i = or) {
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
    if (Kt.has(e)) {
      const c = Kt.get(e);
      if (c.key === n)
        return c.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let s;
    const i = this.workerNextTaskID++, r = e.byteLength, a = this._getWorker(i, r).then((c) => (s = c, new Promise((u, d) => {
      s._callbacks[i] = { resolve: u, reject: d }, s.postMessage({ type: "decode", id: i, taskConfig: t, buffer: e }, [e]);
    }))).then((c) => this._createGeometry(c.geometry));
    return a.catch(() => !0).then(() => {
      s && i && this._releaseTask(s, i);
    }), Kt.set(e, {
      key: n,
      promise: a
    }), a;
  }
  _createGeometry(e) {
    const t = new on();
    e.index && t.setIndex(new dt(e.index.array, 1));
    for (let n = 0; n < e.attributes.length; n++) {
      const s = e.attributes[n], i = s.name, r = s.array, a = s.itemSize, c = new dt(r, a);
      i === "color" && this._assignVertexColorSpace(c, s.vertexColorSpace), t.setAttribute(i, c);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== bn)
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
      const i = jr.toString(), r = [
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
function jr() {
  let h, e;
  onmessage = function(r) {
    const a = r.data;
    switch (a.type) {
      case "init":
        h = a.decoderConfig, e = new Promise(function(d) {
          h.onModuleLoaded = function(f) {
            d({ draco: f });
          }, DracoDecoderModule(h);
        });
        break;
      case "decode":
        const c = a.buffer, u = a.taskConfig;
        e.then((d) => {
          const f = d.draco, m = new f.Decoder();
          try {
            const A = t(f, m, new Int8Array(c), u), U = A.attributes.map((B) => B.array.buffer);
            A.index && U.push(A.index.array.buffer), self.postMessage({ type: "decode", id: a.id, geometry: A }, U);
          } catch (A) {
            console.error(A), self.postMessage({ type: "error", id: a.id, error: A.message });
          } finally {
            f.destroy(m);
          }
        });
        break;
    }
  };
  function t(r, a, c, u) {
    const d = u.attributeIDs, f = u.attributeTypes;
    let m, A;
    const U = a.GetEncodedGeometryType(c);
    if (U === r.TRIANGULAR_MESH)
      m = new r.Mesh(), A = a.DecodeArrayToMesh(c, c.byteLength, m);
    else if (U === r.POINT_CLOUD)
      m = new r.PointCloud(), A = a.DecodeArrayToPointCloud(c, c.byteLength, m);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!A.ok() || m.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + A.error_msg());
    const B = { index: null, attributes: [] };
    for (const M in d) {
      const N = self[f[M]];
      let z, R;
      if (u.useUniqueIDs)
        R = d[M], z = a.GetAttributeByUniqueId(m, R);
      else {
        if (R = a.GetAttributeId(m, r[d[M]]), R === -1)
          continue;
        z = a.GetAttribute(m, R);
      }
      const L = s(r, a, m, M, N, z);
      M === "color" && (L.vertexColorSpace = u.vertexColorSpace), B.attributes.push(L);
    }
    return U === r.TRIANGULAR_MESH && (B.index = n(r, a, m)), r.destroy(m), B;
  }
  function n(r, a, c) {
    const d = c.num_faces() * 3, f = d * 4, m = r._malloc(f);
    a.GetTrianglesUInt32Array(c, f, m);
    const A = new Uint32Array(r.HEAPF32.buffer, m, d).slice();
    return r._free(m), { array: A, itemSize: 1 };
  }
  function s(r, a, c, u, d, f) {
    const m = f.num_components(), U = c.num_points() * m, B = U * d.BYTES_PER_ELEMENT, M = i(r, d), N = r._malloc(B);
    a.GetAttributeDataArrayForAllPoints(c, f, M, B, N);
    const z = new d(r.HEAPF32.buffer, N, U).slice();
    return r._free(N), {
      name: u,
      array: z,
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
class Vr extends Un {
  constructor(e) {
    super(e), this.type = ze;
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
      let G = R.pos, _ = -1, T = 0, Z = "", P = String.fromCharCode.apply(null, new Uint16Array(R.subarray(G, G + 128)));
      for (; 0 > (_ = P.indexOf(f)) && T < L && G < R.byteLength; )
        Z += P, T += P.length, G += 128, P += String.fromCharCode.apply(null, new Uint16Array(R.subarray(G, G + 128)));
      return -1 < _ ? (W !== !1 && (R.pos += T + _ + 1), Z + P.slice(0, _)) : !1;
    }, A = function(R) {
      const L = /^#\?(\S+)/, W = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, H = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, G = /^\s*FORMAT=(\S+)\s*$/, _ = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, T = {
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
      let Z, P;
      if (R.pos >= R.byteLength || !(Z = m(R)))
        return a(1, "no header found");
      if (!(P = Z.match(L)))
        return a(3, "bad initial token");
      for (T.valid |= 1, T.programtype = P[1], T.string += Z + `
`; Z = m(R), Z !== !1; ) {
        if (T.string += Z + `
`, Z.charAt(0) === "#") {
          T.comments += Z + `
`;
          continue;
        }
        if ((P = Z.match(W)) && (T.gamma = parseFloat(P[1])), (P = Z.match(H)) && (T.exposure = parseFloat(P[1])), (P = Z.match(G)) && (T.valid |= 2, T.format = P[1]), (P = Z.match(_)) && (T.valid |= 4, T.height = parseInt(P[1], 10), T.width = parseInt(P[2], 10)), T.valid & 2 && T.valid & 4)
          break;
      }
      return T.valid & 2 ? T.valid & 4 ? T : a(3, "missing image size specifier") : a(3, "missing format specifier");
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
      const G = new Uint8Array(4 * L * W);
      if (!G.length)
        return a(4, "unable to allocate buffer space");
      let _ = 0, T = 0;
      const Z = 4 * H, P = new Uint8Array(4), j = new Uint8Array(Z);
      let ee = W;
      for (; ee > 0 && T < R.byteLength; ) {
        if (T + 4 > R.byteLength)
          return a(1);
        if (P[0] = R[T++], P[1] = R[T++], P[2] = R[T++], P[3] = R[T++], P[0] != 2 || P[1] != 2 || (P[2] << 8 | P[3]) != H)
          return a(3, "bad rgbe scanline format");
        let ne = 0, te;
        for (; ne < Z && T < R.byteLength; ) {
          te = R[T++];
          const de = te > 128;
          if (de && (te -= 128), te === 0 || ne + te > Z)
            return a(3, "bad scanline data");
          if (de) {
            const pe = R[T++];
            for (let Pe = 0; Pe < te; Pe++)
              j[ne++] = pe;
          } else
            j.set(R.subarray(T, T + te), ne), ne += te, T += te;
        }
        const se = H;
        for (let de = 0; de < se; de++) {
          let pe = 0;
          G[_] = j[de + pe], pe += H, G[_ + 1] = j[de + pe], pe += H, G[_ + 2] = j[de + pe], pe += H, G[_ + 3] = j[de + pe], _ += 4;
        }
        ee--;
      }
      return G;
    }, B = function(R, L, W, H) {
      const G = R[L + 3], _ = Math.pow(2, G - 128) / 255;
      W[H + 0] = R[L + 0] * _, W[H + 1] = R[L + 1] * _, W[H + 2] = R[L + 2] * _, W[H + 3] = 1;
    }, M = function(R, L, W, H) {
      const G = R[L + 3], _ = Math.pow(2, G - 128) / 255;
      W[H + 0] = Je.toHalfFloat(Math.min(R[L + 0] * _, 65504)), W[H + 1] = Je.toHalfFloat(Math.min(R[L + 1] * _, 65504)), W[H + 2] = Je.toHalfFloat(Math.min(R[L + 2] * _, 65504)), W[H + 3] = Je.toHalfFloat(1);
    }, N = new Uint8Array(e);
    N.pos = 0;
    const z = A(N);
    if (z !== -1) {
      const R = z.width, L = z.height, W = U(N.subarray(N.pos), R, L);
      if (W !== -1) {
        let H, G, _;
        switch (this.type) {
          case et:
            _ = W.length / 4;
            const T = new Float32Array(_ * 4);
            for (let P = 0; P < _; P++)
              B(W, P * 4, T, P * 4);
            H = T, G = et;
            break;
          case ze:
            _ = W.length / 4;
            const Z = new Uint16Array(_ * 4);
            for (let P = 0; P < _; P++)
              M(W, P * 4, Z, P * 4);
            H = Z, G = ze;
            break;
          default:
            console.error("THREE.RGBELoader: unsupported type: ", this.type);
            break;
        }
        return {
          width: R,
          height: L,
          data: H,
          header: z.string,
          gamma: z.gamma,
          exposure: z.exposure,
          type: G
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
        case et:
        case ze:
          r.encoding = $t, r.minFilter = nt, r.magFilter = nt, r.generateMipmaps = !1, r.flipY = !0;
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
var Sn = function(h) {
  return URL.createObjectURL(new Blob([h], { type: "text/javascript" }));
};
try {
  URL.revokeObjectURL(Sn(""));
} catch {
  Sn = function(e) {
    return "data:application/javascript;charset=UTF-8," + encodeURI(e);
  };
}
var Ie = Uint8Array, Ze = Uint16Array, sn = Uint32Array, Hn = new Ie([
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
]), Gn = new Ie([
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
]), Xr = new Ie([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), zn = function(h, e) {
  for (var t = new Ze(31), n = 0; n < 31; ++n)
    t[n] = e += 1 << h[n - 1];
  for (var s = new sn(t[30]), n = 1; n < 30; ++n)
    for (var i = t[n]; i < t[n + 1]; ++i)
      s[i] = i - t[n] << 5 | n;
  return [t, s];
}, Zn = zn(Hn, 2), jn = Zn[0], Kr = Zn[1];
jn[28] = 258, Kr[258] = 28;
var Wr = zn(Gn, 0), Yr = Wr[0], rn = new Ze(32768);
for (var le = 0; le < 32768; ++le) {
  var Be = (le & 43690) >>> 1 | (le & 21845) << 1;
  Be = (Be & 52428) >>> 2 | (Be & 13107) << 2, Be = (Be & 61680) >>> 4 | (Be & 3855) << 4, rn[le] = ((Be & 65280) >>> 8 | (Be & 255) << 8) >>> 1;
}
var pt = function(h, e, t) {
  for (var n = h.length, s = 0, i = new Ze(e); s < n; ++s)
    ++i[h[s] - 1];
  var r = new Ze(e);
  for (s = 0; s < e; ++s)
    r[s] = r[s - 1] + i[s - 1] << 1;
  var a;
  if (t) {
    a = new Ze(1 << e);
    var c = 15 - e;
    for (s = 0; s < n; ++s)
      if (h[s])
        for (var u = s << 4 | h[s], d = e - h[s], f = r[h[s] - 1]++ << d, m = f | (1 << d) - 1; f <= m; ++f)
          a[rn[f] >>> c] = u;
  } else
    for (a = new Ze(n), s = 0; s < n; ++s)
      h[s] && (a[s] = rn[r[h[s] - 1]++] >>> 15 - h[s]);
  return a;
}, _t = new Ie(288);
for (var le = 0; le < 144; ++le)
  _t[le] = 8;
for (var le = 144; le < 256; ++le)
  _t[le] = 9;
for (var le = 256; le < 280; ++le)
  _t[le] = 7;
for (var le = 280; le < 288; ++le)
  _t[le] = 8;
var Vn = new Ie(32);
for (var le = 0; le < 32; ++le)
  Vn[le] = 5;
var Qr = /* @__PURE__ */ pt(_t, 9, 1), qr = /* @__PURE__ */ pt(Vn, 5, 1), Wt = function(h) {
  for (var e = h[0], t = 1; t < h.length; ++t)
    h[t] > e && (e = h[t]);
  return e;
}, Ce = function(h, e, t) {
  var n = e / 8 | 0;
  return (h[n] | h[n + 1] << 8) >> (e & 7) & t;
}, Yt = function(h, e) {
  var t = e / 8 | 0;
  return (h[t] | h[t + 1] << 8 | h[t + 2] << 16) >> (e & 7);
}, Jr = function(h) {
  return (h / 8 | 0) + (h & 7 && 1);
}, $r = function(h, e, t) {
  (e == null || e < 0) && (e = 0), (t == null || t > h.length) && (t = h.length);
  var n = new (h instanceof Ze ? Ze : h instanceof sn ? sn : Ie)(t - e);
  return n.set(h.subarray(e, t)), n;
}, ei = function(h, e, t) {
  var n = h.length;
  if (!n || t && !t.l && n < 5)
    return e || new Ie(0);
  var s = !e || t, i = !t || t.i;
  t || (t = {}), e || (e = new Ie(n * 3));
  var r = function(ie) {
    var De = e.length;
    if (ie > De) {
      var Oe = new Ie(Math.max(De * 2, ie));
      Oe.set(e), e = Oe;
    }
  }, a = t.f || 0, c = t.p || 0, u = t.b || 0, d = t.l, f = t.d, m = t.m, A = t.n, U = n * 8;
  do {
    if (!d) {
      t.f = a = Ce(h, c, 1);
      var B = Ce(h, c + 1, 3);
      if (c += 3, B)
        if (B == 1)
          d = Qr, f = qr, m = 9, A = 5;
        else if (B == 2) {
          var R = Ce(h, c, 31) + 257, L = Ce(h, c + 10, 15) + 4, W = R + Ce(h, c + 5, 31) + 1;
          c += 14;
          for (var H = new Ie(W), G = new Ie(19), _ = 0; _ < L; ++_)
            G[Xr[_]] = Ce(h, c + _ * 3, 7);
          c += L * 3;
          for (var T = Wt(G), Z = (1 << T) - 1, P = pt(G, T, 1), _ = 0; _ < W; ) {
            var j = P[Ce(h, c, Z)];
            c += j & 15;
            var M = j >>> 4;
            if (M < 16)
              H[_++] = M;
            else {
              var ee = 0, ne = 0;
              for (M == 16 ? (ne = 3 + Ce(h, c, 3), c += 2, ee = H[_ - 1]) : M == 17 ? (ne = 3 + Ce(h, c, 7), c += 3) : M == 18 && (ne = 11 + Ce(h, c, 127), c += 7); ne--; )
                H[_++] = ee;
            }
          }
          var te = H.subarray(0, R), se = H.subarray(R);
          m = Wt(te), A = Wt(se), d = pt(te, m, 1), f = pt(se, A, 1);
        } else
          throw "invalid block type";
      else {
        var M = Jr(c) + 4, N = h[M - 4] | h[M - 3] << 8, z = M + N;
        if (z > n) {
          if (i)
            throw "unexpected EOF";
          break;
        }
        s && r(u + N), e.set(h.subarray(M, z), u), t.b = u += N, t.p = c = z * 8;
        continue;
      }
      if (c > U) {
        if (i)
          throw "unexpected EOF";
        break;
      }
    }
    s && r(u + 131072);
    for (var de = (1 << m) - 1, pe = (1 << A) - 1, Pe = c; ; Pe = c) {
      var ee = d[Yt(h, c) & de], be = ee >>> 4;
      if (c += ee & 15, c > U) {
        if (i)
          throw "unexpected EOF";
        break;
      }
      if (!ee)
        throw "invalid length/literal";
      if (be < 256)
        e[u++] = be;
      else if (be == 256) {
        Pe = c, d = null;
        break;
      } else {
        var Ye = be - 254;
        if (be > 264) {
          var _ = be - 257, Te = Hn[_];
          Ye = Ce(h, c, (1 << Te) - 1) + jn[_], c += Te;
        }
        var Ve = f[Yt(h, c) & pe], Xe = Ve >>> 4;
        if (!Ve)
          throw "invalid distance";
        c += Ve & 15;
        var se = Yr[Xe];
        if (Xe > 3) {
          var Te = Gn[Xe];
          se += Yt(h, c) & (1 << Te) - 1, c += Te;
        }
        if (c > U) {
          if (i)
            throw "unexpected EOF";
          break;
        }
        s && r(u + 131072);
        for (var it = u + Ye; u < it; u += 4)
          e[u] = e[u - se], e[u + 1] = e[u + 1 - se], e[u + 2] = e[u + 2 - se], e[u + 3] = e[u + 3 - se];
        u = it;
      }
    }
    t.l = d, t.p = Pe, t.b = u, d && (a = 1, t.m = m, t.d = f, t.n = A);
  } while (!a);
  return u == e.length ? e : $r(e, 0, u);
}, ti = /* @__PURE__ */ new Ie(0), ni = function(h) {
  if ((h[0] & 15) != 8 || h[0] >>> 4 > 7 || (h[0] << 8 | h[1]) % 31)
    throw "invalid zlib data";
  if (h[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function St(h, e) {
  return ei((ni(h), h.subarray(2, -4)), e);
}
var si = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), ri = 0;
try {
  si.decode(ti, { stream: !0 }), ri = 1;
} catch {
}
class ii extends Un {
  constructor(e) {
    super(e), this.type = ze;
  }
  parse(e) {
    const T = Math.pow(2.7182818, 2.2);
    function Z(o, l) {
      let x = 0;
      for (let b = 0; b < 65536; ++b)
        (b == 0 || o[b >> 3] & 1 << (b & 7)) && (l[x++] = b);
      const p = x - 1;
      for (; x < 65536; )
        l[x++] = 0;
      return p;
    }
    function P(o) {
      for (let l = 0; l < 16384; l++)
        o[l] = {}, o[l].len = 0, o[l].lit = 0, o[l].p = null;
    }
    const j = { l: 0, c: 0, lc: 0 };
    function ee(o, l, x, p, b) {
      for (; x < o; )
        l = l << 8 | dn(p, b), x += 8;
      x -= o, j.l = l >> x & (1 << o) - 1, j.c = l, j.lc = x;
    }
    const ne = new Array(59);
    function te(o) {
      for (let x = 0; x <= 58; ++x)
        ne[x] = 0;
      for (let x = 0; x < 65537; ++x)
        ne[o[x]] += 1;
      let l = 0;
      for (let x = 58; x > 0; --x) {
        const p = l + ne[x] >> 1;
        ne[x] = l, l = p;
      }
      for (let x = 0; x < 65537; ++x) {
        const p = o[x];
        p > 0 && (o[x] = p | ne[p]++ << 6);
      }
    }
    function se(o, l, x, p, b, g) {
      const y = l;
      let S = 0, v = 0;
      for (; p <= b; p++) {
        if (y.value - l.value > x)
          return !1;
        ee(6, S, v, o, y);
        const w = j.l;
        if (S = j.c, v = j.lc, g[p] = w, w == 63) {
          if (y.value - l.value > x)
            throw new Error("Something wrong with hufUnpackEncTable");
          ee(8, S, v, o, y);
          let E = j.l + 6;
          if (S = j.c, v = j.lc, p + E > b + 1)
            throw new Error("Something wrong with hufUnpackEncTable");
          for (; E--; )
            g[p++] = 0;
          p--;
        } else if (w >= 59) {
          let E = w - 59 + 2;
          if (p + E > b + 1)
            throw new Error("Something wrong with hufUnpackEncTable");
          for (; E--; )
            g[p++] = 0;
          p--;
        }
      }
      te(g);
    }
    function de(o) {
      return o & 63;
    }
    function pe(o) {
      return o >> 6;
    }
    function Pe(o, l, x, p) {
      for (; l <= x; l++) {
        const b = pe(o[l]), g = de(o[l]);
        if (b >> g)
          throw new Error("Invalid table entry");
        if (g > 14) {
          const y = p[b >> g - 14];
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
            const v = p[(b << 14 - g) + y];
            if (v.len || v.p)
              throw new Error("Invalid table entry");
            v.len = g, v.lit = l, y++;
          }
        }
      }
      return !0;
    }
    const be = { c: 0, lc: 0 };
    function Ye(o, l, x, p) {
      o = o << 8 | dn(x, p), l += 8, be.c = o, be.lc = l;
    }
    const Te = { c: 0, lc: 0 };
    function Ve(o, l, x, p, b, g, y, S, v) {
      if (o == l) {
        p < 8 && (Ye(x, p, b, g), x = be.c, p = be.lc), p -= 8;
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
      Te.c = x, Te.lc = p;
    }
    function Xe(o) {
      return o & 65535;
    }
    function it(o) {
      const l = Xe(o);
      return l > 32767 ? l - 65536 : l;
    }
    const ie = { a: 0, b: 0 };
    function De(o, l) {
      const x = it(o), b = it(l), g = x + (b & 1) + (b >> 1), y = g, S = g - b;
      ie.a = y, ie.b = S;
    }
    function Oe(o, l) {
      const x = Xe(o), p = Xe(l), b = x - (p >> 1) & 65535, g = p + b - 32768 & 65535;
      ie.a = g, ie.b = b;
    }
    function Wn(o, l, x, p, b, g, y) {
      const S = y < 16384, v = x > b ? b : x;
      let w = 1, E, k;
      for (; w <= v; )
        w <<= 1;
      for (w >>= 1, E = w, w >>= 1; w >= 1; ) {
        k = 0;
        const C = k + g * (b - E), F = g * w, X = g * E, D = p * w, O = p * E;
        let K, ue, he, ye;
        for (; k <= C; k += X) {
          let ae = k;
          const J = k + p * (x - E);
          for (; ae <= J; ae += O) {
            const xe = ae + D, Se = ae + F, fe = Se + D;
            S ? (De(o[ae + l], o[Se + l]), K = ie.a, he = ie.b, De(o[xe + l], o[fe + l]), ue = ie.a, ye = ie.b, De(K, ue), o[ae + l] = ie.a, o[xe + l] = ie.b, De(he, ye), o[Se + l] = ie.a, o[fe + l] = ie.b) : (Oe(o[ae + l], o[Se + l]), K = ie.a, he = ie.b, Oe(o[xe + l], o[fe + l]), ue = ie.a, ye = ie.b, Oe(K, ue), o[ae + l] = ie.a, o[xe + l] = ie.b, Oe(he, ye), o[Se + l] = ie.a, o[fe + l] = ie.b);
          }
          if (x & w) {
            const xe = ae + F;
            S ? De(o[ae + l], o[xe + l]) : Oe(o[ae + l], o[xe + l]), K = ie.a, o[xe + l] = ie.b, o[ae + l] = K;
          }
        }
        if (b & w) {
          let ae = k;
          const J = k + p * (x - E);
          for (; ae <= J; ae += O) {
            const xe = ae + D;
            S ? De(o[ae + l], o[xe + l]) : Oe(o[ae + l], o[xe + l]), K = ie.a, o[xe + l] = ie.b, o[ae + l] = K;
          }
        }
        E = w, w >>= 1;
      }
      return k;
    }
    function Yn(o, l, x, p, b, g, y, S, v) {
      let w = 0, E = 0;
      const k = y, C = Math.trunc(p.value + (b + 7) / 8);
      for (; p.value < C; )
        for (Ye(w, E, x, p), w = be.c, E = be.lc; E >= 14; ) {
          const X = w >> E - 14 & 16383, D = l[X];
          if (D.len)
            E -= D.len, Ve(D.lit, g, w, E, x, p, S, v, k), w = Te.c, E = Te.lc;
          else {
            if (!D.p)
              throw new Error("hufDecode issues");
            let O;
            for (O = 0; O < D.lit; O++) {
              const K = de(o[D.p[O]]);
              for (; E < K && p.value < C; )
                Ye(w, E, x, p), w = be.c, E = be.lc;
              if (E >= K && pe(o[D.p[O]]) == (w >> E - K & (1 << K) - 1)) {
                E -= K, Ve(D.p[O], g, w, E, x, p, S, v, k), w = Te.c, E = Te.lc;
                break;
              }
            }
            if (O == D.lit)
              throw new Error("hufDecode issues");
          }
        }
      const F = 8 - b & 7;
      for (w >>= F, E -= F; E > 0; ) {
        const X = l[w << 14 - E & 16383];
        if (X.len)
          E -= X.len, Ve(X.lit, g, w, E, x, p, S, v, k), w = Te.c, E = Te.lc;
        else
          throw new Error("hufDecode issues");
      }
      return !0;
    }
    function cn(o, l, x, p, b, g) {
      const y = { value: 0 }, S = x.value, v = Ae(l, x), w = Ae(l, x);
      x.value += 4;
      const E = Ae(l, x);
      if (x.value += 4, v < 0 || v >= 65537 || w < 0 || w >= 65537)
        throw new Error("Something wrong with HUF_ENCSIZE");
      const k = new Array(65537), C = new Array(16384);
      P(C);
      const F = p - (x.value - S);
      if (se(o, x, F, v, w, k), E > 8 * (p - (x.value - S)))
        throw new Error("Something wrong with hufUncompress");
      Pe(k, v, w, C), Yn(k, C, o, x, E, w, g, b, y);
    }
    function Qn(o, l, x) {
      for (let p = 0; p < x; ++p)
        l[p] = o[l[p]];
    }
    function ln(o) {
      for (let l = 1; l < o.length; l++) {
        const x = o[l - 1] + o[l] - 128;
        o[l] = x;
      }
    }
    function un(o, l) {
      let x = 0, p = Math.floor((o.length + 1) / 2), b = 0;
      const g = o.length - 1;
      for (; !(b > g || (l[b++] = o[x++], b > g)); )
        l[b++] = o[p++];
    }
    function hn(o) {
      let l = o.byteLength;
      const x = new Array();
      let p = 0;
      const b = new DataView(o);
      for (; l > 0; ) {
        const g = b.getInt8(p++);
        if (g < 0) {
          const y = -g;
          l -= y + 1;
          for (let S = 0; S < y; S++)
            x.push(b.getUint8(p++));
        } else {
          const y = g;
          l -= 2;
          const S = b.getUint8(p++);
          for (let v = 0; v < y + 1; v++)
            x.push(S);
        }
      }
      return x;
    }
    function qn(o, l, x, p, b, g) {
      let y = new DataView(g.buffer);
      const S = x[o.idx[0]].width, v = x[o.idx[0]].height, w = 3, E = Math.floor(S / 8), k = Math.ceil(S / 8), C = Math.ceil(v / 8), F = S - (k - 1) * 8, X = v - (C - 1) * 8, D = { value: 0 }, O = new Array(w), K = new Array(w), ue = new Array(w), he = new Array(w), ye = new Array(w);
      for (let J = 0; J < w; ++J)
        ye[J] = l[o.idx[J]], O[J] = J < 1 ? 0 : O[J - 1] + k * C, K[J] = new Float32Array(64), ue[J] = new Uint16Array(64), he[J] = new Uint16Array(k * 64);
      for (let J = 0; J < C; ++J) {
        let xe = 8;
        J == C - 1 && (xe = X);
        let Se = 8;
        for (let re = 0; re < k; ++re) {
          re == k - 1 && (Se = F);
          for (let oe = 0; oe < w; ++oe)
            ue[oe].fill(0), ue[oe][0] = b[O[oe]++], Jn(D, p, ue[oe]), $n(ue[oe], K[oe]), es(K[oe]);
          ts(K);
          for (let oe = 0; oe < w; ++oe)
            ns(K[oe], he[oe], re * 64);
        }
        let fe = 0;
        for (let re = 0; re < w; ++re) {
          const oe = x[o.idx[re]].type;
          for (let Ue = 8 * J; Ue < 8 * J + xe; ++Ue) {
            fe = ye[re][Ue];
            for (let ut = 0; ut < E; ++ut) {
              const Ne = ut * 64 + (Ue & 7) * 8;
              y.setUint16(fe + 0 * 2 * oe, he[re][Ne + 0], !0), y.setUint16(fe + 1 * 2 * oe, he[re][Ne + 1], !0), y.setUint16(fe + 2 * 2 * oe, he[re][Ne + 2], !0), y.setUint16(fe + 3 * 2 * oe, he[re][Ne + 3], !0), y.setUint16(fe + 4 * 2 * oe, he[re][Ne + 4], !0), y.setUint16(fe + 5 * 2 * oe, he[re][Ne + 5], !0), y.setUint16(fe + 6 * 2 * oe, he[re][Ne + 6], !0), y.setUint16(fe + 7 * 2 * oe, he[re][Ne + 7], !0), fe += 8 * 2 * oe;
            }
          }
          if (E != k)
            for (let Ue = 8 * J; Ue < 8 * J + xe; ++Ue) {
              const ut = ye[re][Ue] + 8 * E * 2 * oe, Ne = E * 64 + (Ue & 7) * 8;
              for (let yt = 0; yt < Se; ++yt)
                y.setUint16(ut + yt * 2 * oe, he[re][Ne + yt], !0);
            }
        }
      }
      const ae = new Uint16Array(S);
      y = new DataView(g.buffer);
      for (let J = 0; J < w; ++J) {
        x[o.idx[J]].decoded = !0;
        const xe = x[o.idx[J]].type;
        if (x[J].type == 2)
          for (let Se = 0; Se < v; ++Se) {
            const fe = ye[J][Se];
            for (let re = 0; re < S; ++re)
              ae[re] = y.getUint16(fe + re * 2 * xe, !0);
            for (let re = 0; re < S; ++re)
              y.setFloat32(fe + re * 2 * xe, I(ae[re]), !0);
          }
      }
    }
    function Jn(o, l, x) {
      let p, b = 1;
      for (; b < 64; )
        p = l[o.value], p == 65280 ? b = 64 : p >> 8 == 255 ? b += p & 255 : (x[b] = p, b++), o.value++;
    }
    function $n(o, l) {
      l[0] = I(o[0]), l[1] = I(o[1]), l[2] = I(o[5]), l[3] = I(o[6]), l[4] = I(o[14]), l[5] = I(o[15]), l[6] = I(o[27]), l[7] = I(o[28]), l[8] = I(o[2]), l[9] = I(o[4]), l[10] = I(o[7]), l[11] = I(o[13]), l[12] = I(o[16]), l[13] = I(o[26]), l[14] = I(o[29]), l[15] = I(o[42]), l[16] = I(o[3]), l[17] = I(o[8]), l[18] = I(o[12]), l[19] = I(o[17]), l[20] = I(o[25]), l[21] = I(o[30]), l[22] = I(o[41]), l[23] = I(o[43]), l[24] = I(o[9]), l[25] = I(o[11]), l[26] = I(o[18]), l[27] = I(o[24]), l[28] = I(o[31]), l[29] = I(o[40]), l[30] = I(o[44]), l[31] = I(o[53]), l[32] = I(o[10]), l[33] = I(o[19]), l[34] = I(o[23]), l[35] = I(o[32]), l[36] = I(o[39]), l[37] = I(o[45]), l[38] = I(o[52]), l[39] = I(o[54]), l[40] = I(o[20]), l[41] = I(o[22]), l[42] = I(o[33]), l[43] = I(o[38]), l[44] = I(o[46]), l[45] = I(o[51]), l[46] = I(o[55]), l[47] = I(o[60]), l[48] = I(o[21]), l[49] = I(o[34]), l[50] = I(o[37]), l[51] = I(o[47]), l[52] = I(o[50]), l[53] = I(o[56]), l[54] = I(o[59]), l[55] = I(o[61]), l[56] = I(o[35]), l[57] = I(o[36]), l[58] = I(o[48]), l[59] = I(o[49]), l[60] = I(o[57]), l[61] = I(o[58]), l[62] = I(o[62]), l[63] = I(o[63]);
    }
    function es(o) {
      const l = 0.5 * Math.cos(0.7853975), x = 0.5 * Math.cos(3.14159 / 16), p = 0.5 * Math.cos(3.14159 / 8), b = 0.5 * Math.cos(3 * 3.14159 / 16), g = 0.5 * Math.cos(5 * 3.14159 / 16), y = 0.5 * Math.cos(3 * 3.14159 / 8), S = 0.5 * Math.cos(7 * 3.14159 / 16), v = new Array(4), w = new Array(4), E = new Array(4), k = new Array(4);
      for (let C = 0; C < 8; ++C) {
        const F = C * 8;
        v[0] = p * o[F + 2], v[1] = y * o[F + 2], v[2] = p * o[F + 6], v[3] = y * o[F + 6], w[0] = x * o[F + 1] + b * o[F + 3] + g * o[F + 5] + S * o[F + 7], w[1] = b * o[F + 1] - S * o[F + 3] - x * o[F + 5] - g * o[F + 7], w[2] = g * o[F + 1] - x * o[F + 3] + S * o[F + 5] + b * o[F + 7], w[3] = S * o[F + 1] - g * o[F + 3] + b * o[F + 5] - x * o[F + 7], E[0] = l * (o[F + 0] + o[F + 4]), E[3] = l * (o[F + 0] - o[F + 4]), E[1] = v[0] + v[3], E[2] = v[1] - v[2], k[0] = E[0] + E[1], k[1] = E[3] + E[2], k[2] = E[3] - E[2], k[3] = E[0] - E[1], o[F + 0] = k[0] + w[0], o[F + 1] = k[1] + w[1], o[F + 2] = k[2] + w[2], o[F + 3] = k[3] + w[3], o[F + 4] = k[3] - w[3], o[F + 5] = k[2] - w[2], o[F + 6] = k[1] - w[1], o[F + 7] = k[0] - w[0];
      }
      for (let C = 0; C < 8; ++C)
        v[0] = p * o[16 + C], v[1] = y * o[16 + C], v[2] = p * o[48 + C], v[3] = y * o[48 + C], w[0] = x * o[8 + C] + b * o[24 + C] + g * o[40 + C] + S * o[56 + C], w[1] = b * o[8 + C] - S * o[24 + C] - x * o[40 + C] - g * o[56 + C], w[2] = g * o[8 + C] - x * o[24 + C] + S * o[40 + C] + b * o[56 + C], w[3] = S * o[8 + C] - g * o[24 + C] + b * o[40 + C] - x * o[56 + C], E[0] = l * (o[C] + o[32 + C]), E[3] = l * (o[C] - o[32 + C]), E[1] = v[0] + v[3], E[2] = v[1] - v[2], k[0] = E[0] + E[1], k[1] = E[3] + E[2], k[2] = E[3] - E[2], k[3] = E[0] - E[1], o[0 + C] = k[0] + w[0], o[8 + C] = k[1] + w[1], o[16 + C] = k[2] + w[2], o[24 + C] = k[3] + w[3], o[32 + C] = k[3] - w[3], o[40 + C] = k[2] - w[2], o[48 + C] = k[1] - w[1], o[56 + C] = k[0] - w[0];
    }
    function ts(o) {
      for (let l = 0; l < 64; ++l) {
        const x = o[0][l], p = o[1][l], b = o[2][l];
        o[0][l] = x + 1.5747 * b, o[1][l] = x - 0.1873 * p - 0.4682 * b, o[2][l] = x + 1.8556 * p;
      }
    }
    function ns(o, l, x) {
      for (let p = 0; p < 64; ++p)
        l[x + p] = Je.toHalfFloat(ss(o[p]));
    }
    function ss(o) {
      return o <= 1 ? Math.sign(o) * Math.pow(Math.abs(o), 2.2) : Math.sign(o) * Math.pow(T, Math.abs(o) - 1);
    }
    function xn(o) {
      return new DataView(o.array.buffer, o.offset.value, o.size);
    }
    function rs(o) {
      const l = o.viewer.buffer.slice(o.offset.value, o.offset.value + o.size), x = new Uint8Array(hn(l)), p = new Uint8Array(x.length);
      return ln(x), un(x, p), new DataView(p.buffer);
    }
    function zt(o) {
      const l = o.array.slice(o.offset.value, o.offset.value + o.size), x = St(l), p = new Uint8Array(x.length);
      return ln(x), un(x, p), new DataView(p.buffer);
    }
    function is(o) {
      const l = o.viewer, x = { value: o.offset.value }, p = new Uint16Array(o.width * o.scanlineBlockSize * (o.channels * o.type)), b = new Uint8Array(8192);
      let g = 0;
      const y = new Array(o.channels);
      for (let X = 0; X < o.channels; X++)
        y[X] = {}, y[X].start = g, y[X].end = y[X].start, y[X].nx = o.width, y[X].ny = o.lines, y[X].size = o.type, g += y[X].nx * y[X].ny * y[X].size;
      const S = at(l, x), v = at(l, x);
      if (v >= 8192)
        throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");
      if (S <= v)
        for (let X = 0; X < v - S + 1; X++)
          b[X + S] = Qe(l, x);
      const w = new Uint16Array(65536), E = Z(b, w), k = Ae(l, x);
      cn(o.array, l, x, k, p, g);
      for (let X = 0; X < o.channels; ++X) {
        const D = y[X];
        for (let O = 0; O < y[X].size; ++O)
          Wn(
            p,
            D.start + O,
            D.nx,
            D.size,
            D.ny,
            D.nx * D.size,
            E
          );
      }
      Qn(w, p, g);
      let C = 0;
      const F = new Uint8Array(p.buffer.byteLength);
      for (let X = 0; X < o.lines; X++)
        for (let D = 0; D < o.channels; D++) {
          const O = y[D], K = O.nx * O.size, ue = new Uint8Array(p.buffer, O.end * 2, K * 2);
          F.set(ue, C), C += K * 2, O.end += K;
        }
      return new DataView(F.buffer);
    }
    function os(o) {
      const l = o.array.slice(o.offset.value, o.offset.value + o.size), x = St(l), p = o.lines * o.channels * o.width, b = o.type == 1 ? new Uint16Array(p) : new Uint32Array(p);
      let g = 0, y = 0;
      const S = new Array(4);
      for (let v = 0; v < o.lines; v++)
        for (let w = 0; w < o.channels; w++) {
          let E = 0;
          switch (o.type) {
            case 1:
              S[0] = g, S[1] = S[0] + o.width, g = S[1] + o.width;
              for (let k = 0; k < o.width; ++k) {
                const C = x[S[0]++] << 8 | x[S[1]++];
                E += C, b[y] = E, y++;
              }
              break;
            case 2:
              S[0] = g, S[1] = S[0] + o.width, S[2] = S[1] + o.width, g = S[2] + o.width;
              for (let k = 0; k < o.width; ++k) {
                const C = x[S[0]++] << 24 | x[S[1]++] << 16 | x[S[2]++] << 8;
                E += C, b[y] = E, y++;
              }
              break;
          }
        }
      return new DataView(b.buffer);
    }
    function fn(o) {
      const l = o.viewer, x = { value: o.offset.value }, p = new Uint8Array(o.width * o.lines * (o.channels * o.type * 2)), b = {
        version: Ee(l, x),
        unknownUncompressedSize: Ee(l, x),
        unknownCompressedSize: Ee(l, x),
        acCompressedSize: Ee(l, x),
        dcCompressedSize: Ee(l, x),
        rleCompressedSize: Ee(l, x),
        rleUncompressedSize: Ee(l, x),
        rleRawSize: Ee(l, x),
        totalAcUncompressedCount: Ee(l, x),
        totalDcUncompressedCount: Ee(l, x),
        acCompression: Ee(l, x)
      };
      if (b.version < 2)
        throw new Error("EXRLoader.parse: " + lt.compression + " version " + b.version + " is unsupported");
      const g = new Array();
      let y = at(l, x) - 2;
      for (; y > 0; ) {
        const D = At(l.buffer, x), O = Qe(l, x), K = O >> 2 & 3, ue = (O >> 4) - 1, he = new Int8Array([ue])[0], ye = Qe(l, x);
        g.push({
          name: D,
          index: he,
          type: ye,
          compression: K
        }), y -= D.length + 3;
      }
      const S = lt.channels, v = new Array(o.channels);
      for (let D = 0; D < o.channels; ++D) {
        const O = v[D] = {}, K = S[D];
        O.name = K.name, O.compression = 0, O.decoded = !1, O.type = K.pixelType, O.pLinear = K.pLinear, O.width = o.width, O.height = o.lines;
      }
      const w = {
        idx: new Array(3)
      };
      for (let D = 0; D < o.channels; ++D) {
        const O = v[D];
        for (let K = 0; K < g.length; ++K) {
          const ue = g[K];
          O.name == ue.name && (O.compression = ue.compression, ue.index >= 0 && (w.idx[ue.index] = D), O.offset = D);
        }
      }
      let E, k, C;
      if (b.acCompressedSize > 0)
        switch (b.acCompression) {
          case 0:
            E = new Uint16Array(b.totalAcUncompressedCount), cn(o.array, l, x, b.acCompressedSize, E, b.totalAcUncompressedCount);
            break;
          case 1:
            const D = o.array.slice(x.value, x.value + b.totalAcUncompressedCount), O = St(D);
            E = new Uint16Array(O.buffer), x.value += b.totalAcUncompressedCount;
            break;
        }
      if (b.dcCompressedSize > 0) {
        const D = {
          array: o.array,
          offset: x,
          size: b.dcCompressedSize
        };
        k = new Uint16Array(zt(D).buffer), x.value += b.dcCompressedSize;
      }
      if (b.rleRawSize > 0) {
        const D = o.array.slice(x.value, x.value + b.rleCompressedSize), O = St(D);
        C = hn(O.buffer), x.value += b.rleCompressedSize;
      }
      let F = 0;
      const X = new Array(v.length);
      for (let D = 0; D < X.length; ++D)
        X[D] = new Array();
      for (let D = 0; D < o.lines; ++D)
        for (let O = 0; O < v.length; ++O)
          X[O].push(F), F += v[O].width * o.type * 2;
      qn(w, X, v, E, k, p);
      for (let D = 0; D < v.length; ++D) {
        const O = v[D];
        if (!O.decoded)
          switch (O.compression) {
            case 2:
              let K = 0, ue = 0;
              for (let he = 0; he < o.lines; ++he) {
                let ye = X[D][K];
                for (let ae = 0; ae < O.width; ++ae) {
                  for (let J = 0; J < 2 * O.type; ++J)
                    p[ye++] = C[ue + J * O.width * O.height];
                  ue++;
                }
                K++;
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
      const b = new TextDecoder().decode(
        x.slice(l.value, l.value + p)
      );
      return l.value = l.value + p + 1, b;
    }
    function as(o, l, x) {
      const p = new TextDecoder().decode(
        new Uint8Array(o).slice(l.value, l.value + x)
      );
      return l.value = l.value + x, p;
    }
    function cs(o, l) {
      const x = ot(o, l), p = Ae(o, l);
      return [x, p];
    }
    function ls(o, l) {
      const x = Ae(o, l), p = Ae(o, l);
      return [x, p];
    }
    function ot(o, l) {
      const x = o.getInt32(l.value, !0);
      return l.value = l.value + 4, x;
    }
    function Ae(o, l) {
      const x = o.getUint32(l.value, !0);
      return l.value = l.value + 4, x;
    }
    function dn(o, l) {
      const x = o[l.value];
      return l.value = l.value + 1, x;
    }
    function Qe(o, l) {
      const x = o.getUint8(l.value);
      return l.value = l.value + 1, x;
    }
    const Ee = function(o, l) {
      let x;
      return "getBigInt64" in DataView.prototype ? x = Number(o.getBigInt64(l.value, !0)) : x = o.getUint32(l.value + 4, !0) + Number(o.getUint32(l.value, !0) << 32), l.value += 8, x;
    };
    function me(o, l) {
      const x = o.getFloat32(l.value, !0);
      return l.value += 4, x;
    }
    function us(o, l) {
      return Je.toHalfFloat(me(o, l));
    }
    function I(o) {
      const l = (o & 31744) >> 10, x = o & 1023;
      return (o >> 15 ? -1 : 1) * (l ? l === 31 ? x ? NaN : 1 / 0 : Math.pow(2, l - 15) * (1 + x / 1024) : 6103515625e-14 * (x / 1024));
    }
    function at(o, l) {
      const x = o.getUint16(l.value, !0);
      return l.value += 2, x;
    }
    function hs(o, l) {
      return I(at(o, l));
    }
    function xs(o, l, x, p) {
      const b = x.value, g = [];
      for (; x.value < b + p - 1; ) {
        const y = At(l, x), S = ot(o, x), v = Qe(o, x);
        x.value += 3;
        const w = ot(o, x), E = ot(o, x);
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
    function fs(o, l) {
      const x = me(o, l), p = me(o, l), b = me(o, l), g = me(o, l), y = me(o, l), S = me(o, l), v = me(o, l), w = me(o, l);
      return { redX: x, redY: p, greenX: b, greenY: g, blueX: y, blueY: S, whiteX: v, whiteY: w };
    }
    function ds(o, l) {
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
      ], p = Qe(o, l);
      return x[p];
    }
    function ps(o, l) {
      const x = Ae(o, l), p = Ae(o, l), b = Ae(o, l), g = Ae(o, l);
      return { xMin: x, yMin: p, xMax: b, yMax: g };
    }
    function ms(o, l) {
      const x = [
        "INCREASING_Y"
      ], p = Qe(o, l);
      return x[p];
    }
    function gs(o, l) {
      const x = me(o, l), p = me(o, l);
      return [x, p];
    }
    function bs(o, l) {
      const x = me(o, l), p = me(o, l), b = me(o, l);
      return [x, p, b];
    }
    function _s(o, l, x, p, b) {
      if (p === "string" || p === "stringvector" || p === "iccProfile")
        return as(l, x, b);
      if (p === "chlist")
        return xs(o, l, x, b);
      if (p === "chromaticities")
        return fs(o, x);
      if (p === "compression")
        return ds(o, x);
      if (p === "box2i")
        return ps(o, x);
      if (p === "lineOrder")
        return ms(o, x);
      if (p === "float")
        return me(o, x);
      if (p === "v2f")
        return gs(o, x);
      if (p === "v3f")
        return bs(o, x);
      if (p === "int")
        return ot(o, x);
      if (p === "rational")
        return cs(o, x);
      if (p === "timecode")
        return ls(o, x);
      if (p === "preview")
        return x.value += b, "skipped";
      x.value += b;
    }
    function Ts(o, l, x) {
      const p = {};
      if (o.getUint32(0, !0) != 20000630)
        throw new Error("THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.");
      p.version = o.getUint8(4);
      const b = o.getUint8(5);
      p.spec = {
        singleTile: !!(b & 2),
        longName: !!(b & 4),
        deepFormat: !!(b & 8),
        multiPart: !!(b & 16)
      }, x.value = 8;
      let g = !0;
      for (; g; ) {
        const y = At(l, x);
        if (y == 0)
          g = !1;
        else {
          const S = At(l, x), v = Ae(o, x), w = _s(o, l, x, S, v);
          w === void 0 ? console.warn(`EXRLoader.parse: skipped unknown header attribute type '${S}'.`) : p[y] = w;
        }
      }
      if (b & -5)
        throw console.error("EXRHeader:", p), new Error("THREE.EXRLoader: provided file is currently unsupported.");
      return p;
    }
    function As(o, l, x, p, b) {
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
          g.lines = 1, g.uncompress = rs;
          break;
        case "ZIPS_COMPRESSION":
          g.lines = 1, g.uncompress = zt;
          break;
        case "ZIP_COMPRESSION":
          g.lines = 16, g.uncompress = zt;
          break;
        case "PIZ_COMPRESSION":
          g.lines = 32, g.uncompress = is;
          break;
        case "PXR24_COMPRESSION":
          g.lines = 16, g.uncompress = os;
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
        switch (b) {
          case et:
            g.getter = hs, g.inputSize = 2;
            break;
          case ze:
            g.getter = at, g.inputSize = 2;
            break;
        }
      else if (g.type == 2)
        switch (b) {
          case et:
            g.getter = me, g.inputSize = 4;
            break;
          case ze:
            g.getter = us, g.inputSize = 4;
        }
      else
        throw new Error("EXRLoader.parse: unsupported pixelType " + g.type + " for " + o.compression + ".");
      g.blockCount = (o.dataWindow.yMax + 1) / g.scanlineBlockSize;
      for (let S = 0; S < g.blockCount; S++)
        Ee(l, p);
      g.outputChannels = g.channels == 3 ? 4 : g.channels;
      const y = g.width * g.height * g.outputChannels;
      switch (b) {
        case et:
          g.byteArray = new Float32Array(y), g.channels < g.outputChannels && g.byteArray.fill(1, 0, y);
          break;
        case ze:
          g.byteArray = new Uint16Array(y), g.channels < g.outputChannels && g.byteArray.fill(15360, 0, y);
          break;
        default:
          console.error("THREE.EXRLoader: unsupported type: ", b);
          break;
      }
      return g.bytesPerLine = g.width * g.inputSize * g.channels, g.outputChannels == 4 ? (g.format = ar, g.encoding = $t) : (g.format = cr, g.encoding = $t), g;
    }
    const wt = new DataView(e), ws = new Uint8Array(e), ct = { value: 0 }, lt = Ts(wt, e, ct), Y = As(lt, wt, ws, ct, this.type), pn = { value: 0 }, ys = { R: 0, G: 1, B: 2, A: 3, Y: 0 };
    for (let o = 0; o < Y.height / Y.scanlineBlockSize; o++) {
      const l = Ae(wt, ct);
      Y.size = Ae(wt, ct), Y.lines = l + Y.scanlineBlockSize > Y.height ? Y.height - l : Y.scanlineBlockSize;
      const p = Y.size < Y.lines * Y.bytesPerLine ? Y.uncompress(Y) : xn(Y);
      ct.value += Y.size;
      for (let b = 0; b < Y.scanlineBlockSize; b++) {
        const g = b + o * Y.scanlineBlockSize;
        if (g >= Y.height)
          break;
        for (let y = 0; y < Y.channels; y++) {
          const S = ys[lt.channels[y].name];
          for (let v = 0; v < Y.width; v++) {
            pn.value = (b * (Y.channels * Y.width) + y * Y.width + v) * Y.inputSize;
            const w = (Y.height - 1 - g) * (Y.width * Y.outputChannels) + v * Y.outputChannels + S;
            Y.byteArray[w] = Y.getter(p, pn);
          }
        }
      }
    }
    return {
      header: lt,
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
      r.encoding = a.encoding, r.minFilter = nt, r.magFilter = nt, r.generateMipmaps = !1, r.flipY = !1, t && t(r, a);
    }
    return super.load(e, i, n, s);
  }
}
const He = Ct;
(function(h, e) {
  const t = Ct, n = h();
  for (; []; )
    try {
      if (parseInt(t(337)) / 1 + -parseInt(t(342)) / 2 + parseInt(t(335)) / 3 + parseInt(t(345)) / 4 * (-parseInt(t(349)) / 5) + -parseInt(t(341)) / 6 + -parseInt(t(344)) / 7 + -parseInt(t(343)) / 8 * (-parseInt(t(334)) / 9) === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Lt, 160231);
function Ct(h, e) {
  const t = Lt();
  return Ct = function(n, s) {
    return n = n - 334, t[n];
  }, Ct(h, e);
}
function Lt() {
  const h = ["round", "forEach", "getRandomIntRange", "1532880ypCAOI", "109756fXMlLi", "765488RFSCNU", "995057ztfybv", "16IXRQra", "getRandomRange", "quaternionToVector3", "random", "79435TWhuze", "map", "45lukRzH", "419568VTKSIC", "average", "58002gdcoCI"];
  return Lt = function() {
    return h;
  }, Lt();
}
class vt {
  static [He(346)](e, t) {
    return Math[He(348)]() * (t - e) + e;
  }
  static [He(340)](e, t) {
    return Math[He(338)](Math.random() * (t - e) + e);
  }
  static [He(347)](e, t, n, s) {
    const i = e + e, r = t + t, a = n + n, c = e * r, u = e * a, d = t * a, f = s * i, m = s * r, A = s * a;
    return { x: c - A, y: d + f, z: u - m };
  }
  static [He(350)](e, t, n, s, i) {
    return (e - t) * (i - s) / (n - t) + s;
  }
  static [He(336)](e) {
    const t = He;
    let n = 0;
    return e[t(339)]((s) => {
      n += s;
    }), n / e.length;
  }
}
function je(h, e) {
  const t = Nt();
  return je = function(n, s) {
    return n = n - 361, t[n];
  }, je(h, e);
}
function Nt() {
  const h = ["cameraBounds", "Quaternion", "name", "getAnimations", "model", "4kUGUBX", "130358PNTltw", "onHoverAnimations", "getSceneZoneByIndex", "lookAtTarget", "push", "raycastTarget", "side", "getAnimation", "getBackgroundModelsByZone", "348XzcBcf", "wrappedModels", "43312ZuuHVn", "boxCenter", "element", "onHover", "wrappedSceneZones", "2017233JycqcX", "Group", "getWrappedAnimations", "getModel", "updateSceneZones", "length", "userData", "looping", "forEach", "4185110Bcrzaw", "visible", "30juNVUX", "type", "index", "getCameraAnimationStart", "getSceneZoneByName", "models", "getInteractables", "462mfTUlW", "interactables", "5765hoAHdM", "getInteractableModelsByZone", "position", "wrapScene", "camera", "loopAnimations", "getInteractableObject", "lights", "getCameraBoundsObject", "getRaycastTarget", "onClickAnimations", "tracks", "wrappedAnimations", "onClick", "99885PpOmzC", "getInteractablesByZone", "8WReXZM", "player", "children", "getAnimationsFromCSV", "getBoundingBox", "6952HgyHET", "lookAtTargetBox", "material", "cameraAnimations", "values", "zone", "animations", "raycastMesh", "bgMesh", "getAnimationTrack", "interactable", "rotation", "getCenter", "includes", "split", "Vector3", "getPlayer"];
  return Nt = function() {
    return h;
  }, Nt();
}
const $ = je;
(function(h, e) {
  const t = je, n = h();
  for (; []; )
    try {
      if (-parseInt(t(436)) / 1 * (parseInt(t(437)) / 2) + parseInt(t(407)) / 3 * (-parseInt(t(409)) / 4) + -parseInt(t(393)) / 5 * (-parseInt(t(384)) / 6) + parseInt(t(391)) / 7 * (parseInt(t(368)) / 8) + -parseInt(t(373)) / 9 + parseInt(t(382)) / 10 + -parseInt(t(414)) / 11 * (parseInt(t(366)) / 12) === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Nt, 211829);
class oi {
  constructor(e, t, n) {
    const s = je;
    this.animations = n, this[s(389)] = e, this[s(400)] = t, this[s(367)] = { interactables: [], bg: [], player: null }, this.wrappedAnimations = { looping: [], onClick: [], onHover: [], camera: [] }, this[s(372)] = [], this[s(396)](this[s(389)]), this[s(377)](this.wrappedSceneZones);
  }
  wrapScene(e) {
    const t = je, n = { interactables: [], bgMesh: [], player: null }, s = [];
    for (let i = 0; i < e.length; i++) {
      const r = e[i], a = r[t(435)].userData;
      let c = {};
      const u = this[t(434)](a, r[t(433)]);
      switch (a[t(385)]) {
        case t(424):
          c = this[t(399)](r, a, u), n[t(392)].push(c);
          break;
        case t(431):
          c = this[t(401)](r, a), s[t(361)](c);
          break;
        case t(422):
          n[t(422)].push(r[t(435)]);
          break;
        case t(421):
          n.bgMesh[t(361)](r[t(435)]);
          break;
        case t(410):
          n.player = r[t(435)];
          break;
      }
    }
    this[t(367)] = n, this.wrappedSceneZones = s;
  }
  updateSceneZones(e) {
    const t = je, n = [...e];
    for (let s = 0; s < n[t(378)]; s++) {
      const i = n[s], r = i.position, a = this[t(394)](i[t(419)]);
      a[t(378)] <= 0 && this[t(365)](i[t(419)])[t(381)]((m) => {
        a[t(361)](m);
      });
      const c = this.getBoundingBox(a), u = new Q[t(429)]();
      c[t(426)](u);
      const d = new Q.Vector3();
      c.getSize(d), n[s][t(369)] = r, n[s][t(415)] = c, n[s].lookAtTargetSize = d, n[s][t(440)] = u;
    }
    this[t(372)] = n;
  }
  [$(439)](e) {
    const t = $;
    let n = null;
    return this[t(372)][t(381)]((s) => {
      s[t(386)] === e && (n = s);
    }), n;
  }
  [$(388)](e) {
    const t = $;
    let n = null, s = null;
    return this[t(372)][t(381)]((i) => {
      i[t(419)] === e && (n = i);
    }), { zoneBox: n, index: s };
  }
  getLoopingAnimations() {
    const e = $, t = { looping: [] };
    return this[e(405)][e(380)][e(381)]((n) => {
      n.animations.forEach((s) => {
        t[je(380)].push(s);
      });
    }), t;
  }
  [$(375)]() {
    return this[$(405)];
  }
  [$(430)]() {
    const e = $;
    return this[e(367)][e(410)];
  }
  [$(390)]() {
    const e = $;
    return this[e(367)][e(392)];
  }
  [$(408)](e) {
    const t = $, n = [];
    for (let s = 0; s < this[t(367)][t(392)][t(378)]; s++) {
      const i = this[t(367)][t(392)][s];
      i[t(419)] === e && n[t(361)](i);
    }
    return n;
  }
  [$(394)](e) {
    const t = $, n = [];
    for (let s = 0; s < this[t(367)].interactables[t(378)]; s++) {
      const i = this[t(367)][t(392)][s];
      i[t(419)] === e && n[t(361)](i[t(370)].model);
    }
    return n;
  }
  getBackgroundModelsByZone(e) {
    const t = $, n = [];
    for (let s = 0; s < this[t(367)][t(422)][t(378)]; s++) {
      const i = this.wrappedModels.bgMesh[s];
      i[t(385)] === t(374) ? i[t(411)].forEach((r) => {
        const a = t;
        i[a(379)][a(419)] === e && n.push(r);
      }) : i[t(379)].zone === e && n.push(i);
    }
    return n;
  }
  [$(413)](e) {
    const t = $, n = new Q.Box3();
    e[t(385)] === "Group" && (e = [...e.children]);
    for (let s = 0; s < e.length; s++) {
      const i = e[s];
      n.expandByObject(i);
    }
    return n;
  }
  [$(376)](e) {
    const t = $;
    for (let n = 0; n < this[t(389)][t(378)]; n++) {
      const s = this[t(389)][n].model;
      if (s.name === e)
        return s;
    }
    return null;
  }
  getAnimation(e) {
    const t = $;
    for (let n = 0; n < this[t(420)][t(378)]; n++) {
      const s = this[t(420)][n];
      if (s[t(433)] === e)
        return s;
    }
    return null;
  }
  [$(412)](e) {
    const t = $, n = e[t(428)](","), s = [];
    for (let i = 0; i < n[t(378)]; i++) {
      const r = n[i];
      s[t(361)](this[t(364)](r));
    }
    return s;
  }
  [$(423)](e, t) {
    const n = $;
    for (let s = 0; s < e[n(404)][n(378)]; s++)
      if (e[n(404)][s][n(433)] === t)
        return e[n(404)][s];
    return null;
  }
  [$(387)](e) {
    const t = $, n = { position: null, rotation: null };
    for (let s = 0; s < e[t(397)][t(378)]; s++) {
      const i = e[t(397)][s];
      for (let r = 0; r < i.tracks.length; r++) {
        const a = i[t(404)][r];
        if (a[t(433)][t(427)](".position"))
          n[t(395)] = new Q[t(429)](a[t(418)][0], a[t(418)][1], a[t(418)][2]);
        else if (a[t(433)][t(427)](".quaternion")) {
          const c = new Q[t(432)](a[t(418)][0], a[t(418)][1], a[t(418)][2], a[t(418)][3]);
          n[t(425)] = c;
        }
      }
    }
    return n;
  }
  [$(434)](e, t) {
    const n = $;
    let s = null, i = null, r = null, a = null;
    return n(398) in e && (s = this[n(412)](e.loopAnimations), this[n(405)][n(380)][n(361)]({ name: t, animations: s })), n(403) in e && (i = this.getAnimationsFromCSV(e[n(403)]), this.wrappedAnimations.onClick.push({ name: t, animations: i })), n(438) in e && (r = this[n(412)](e[n(438)]), this[n(405)].onHover[n(361)]({ name: t, animations: r })), n(417) in e && (a = this[n(412)](e[n(417)]), this[n(405)][n(397)][n(361)]({ name: t, animations: a })), { loopAnimations: s, onHoverAnimations: r, onClickAnimations: i, cameraAnimations: a };
  }
  getInteractableObject(e, t, n) {
    const s = $, i = this[s(402)](t[s(362)]), r = { name: e.name, raycastTarget: i, element: e, animations: {}, zone: t.zone };
    return n[s(438)] !== null && (r.animations[s(371)] = n[s(438)]), n[s(403)] !== null && (r[s(420)][s(406)] = n[s(403)]), n[s(417)] !== null && (r[s(420)][s(397)] = n[s(417)]), r;
  }
  getCameraBoundsObject(e, t) {
    const n = $, s = { zone: t[n(419)], index: parseInt(t.index, 10), position: e.model[n(395)] };
    return e[n(435)][n(383)] = ![], s;
  }
  getRaycastTarget(e) {
    const t = $, n = this[t(376)](e);
    return n == null ? (console.log("Missing raycast target for: ", e), null) : (n[t(416)][t(363)] = Q.BackSide, n[t(416)][t(383)] = ![], n);
  }
}
function kt() {
  const h = ["5127237iueVNQ", "296AwvGfI", "2wPLPmo", "949727HPVoeV", "4161705YlzIwO", "6sIjiVd", "2323254nvaQnQ", "19432Wotnfw", "1273668kXJcFR", "10251510pKxQyO", "parse"];
  return kt = function() {
    return h;
  }, kt();
}
function Dt(h, e) {
  const t = kt();
  return Dt = function(n, s) {
    return n = n - 381, t[n];
  }, Dt(h, e);
}
const ai = Dt;
(function(h, e) {
  const t = Dt, n = h();
  for (; []; )
    try {
      if (parseInt(t(384)) / 1 * (-parseInt(t(383)) / 2) + parseInt(t(386)) / 3 * (parseInt(t(389)) / 4) + parseInt(t(385)) / 5 + parseInt(t(387)) / 6 + -parseInt(t(388)) / 7 * (-parseInt(t(382)) / 8) + parseInt(t(381)) / 9 + -parseInt(t(390)) / 10 === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(kt, 553911);
class ci {
  async [ai(391)](e) {
    let t = null;
    return await fetch(e).then((n) => n.json()).then((n) => {
      t = n;
    }), t;
  }
}
const ce = Ke;
(function(h, e) {
  const t = Ke, n = h();
  for (; []; )
    try {
      if (parseInt(t(284)) / 1 + -parseInt(t(230)) / 2 * (-parseInt(t(236)) / 3) + -parseInt(t(247)) / 4 + parseInt(t(281)) / 5 + parseInt(t(283)) / 6 * (-parseInt(t(229)) / 7) + parseInt(t(257)) / 8 * (parseInt(t(287)) / 9) + parseInt(t(205)) / 10 * (parseInt(t(234)) / 11) === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Ot, 859542);
function Ke(h, e) {
  const t = Ot();
  return Ke = function(n, s) {
    return n = n - 186, t[n];
  }, Ke(h, e);
}
function Ot() {
  const h = ["lights", "PMREMGenerator", "enableAll", "path", "EquirectangularReflectionMapping", "Mesh", "dispose", "type", "directional", "renderer", "setDRACOLoader", "exr", "jsonPath", "addPointLight", "scene", "scale", "SpotLight", "4790795DVNSph", "DEBUG_xyz3d", "8446218EPCekl", "137921MeOYBv", "add", "background", "1448982kVQdul", "loaded", "compileEquirectangularShader", "addGLTFModel", "children", "PointLight", "Object3D", "PointLightHelper", "length", "mapping", "AmbientLight", "set", "load", "sceneWrapper", "addLighting", '<iframe id="XYZ3d-fullscreen" src="', "target", "getModel", "parse", "gltfLoader", "raycastMesh", "gltf children :>> ", "processModel", "20RpdKFL", "name", "loadModel", "jsonData", "setDecoderPath", "position", "color", "addHDR", "ambientLight", "gltf", "intensity", "AxesHelper", "hdr", "DirectionalLightHelper", "directionalLight", "Vector3", "addAmbientLight", "content", "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/libs/draco/", "backgroundIntensity", "cameraBounds", "total", "addEXR", "interactablesContent", "7uhhptg", "226jQeGMS", "backgroundBlurriness", "receiveShadow", "An error happened ", "2710972cZoOaD", "pointLight", "23109fxluPN", "userData", '"></iframe>', "createLightContainer", "iframe", "normalBias", "modelName", "log", "light", "spot", "size", "6564640YeBKtD", "castShadow", "texture", "point", "quaternion", "getHtmlData", "addDirectionalLight", "createModelContainer", "push", "models", "72XXkgpU", "animations", "DirectionalLight", "setModelMatrixData", "rotation", "loadJson", "lerp"];
  return Ot = function() {
    return h;
  }, Ot();
}
class li {
  constructor(e, t, n) {
    const s = Ke;
    this[s(278)] = e, this.renderer = t, this.jsonPath = n, this.sceneWrapper;
    const i = new Zr();
    if (i[s(209)](s(223)), this[s(201)] = new hr(), this[s(201)][s(274)](i), window[s(282)]) {
      const r = new Q[s(216)](5e3);
      this[s(278)][s(285)](r);
    }
  }
  getSceneWrapper() {
    return this[Ke(195)];
  }
  async [ce(262)]() {
    const e = ce;
    return await new ci()[e(200)](this[e(276)]);
  }
  async build(e) {
    const t = ce, n = await this[t(262)](), s = [], i = [], r = await this.addGLTFModel(n[t(256)], e), a = this[t(196)](n[t(264)]);
    return a[t(255)](...r[t(264)]), s[t(255)](...r[t(256)]), i.push(...r[t(258)]), this.sceneWrapper = new oi(s, a, i), this[t(195)];
  }
  async [ce(290)](e, t) {
    const n = ce, s = [], i = [], r = [];
    for (let a = 0; a < e[n(190)]; a++) {
      const c = e[a], u = function(d) {
        const f = n;
        t(a + 1, e[f(190)], 100 * d[f(288)] / d[f(226)]);
      };
      await this[n(207)](c, u).then((d) => {
        const f = n;
        window[f(282)] && console.log(f(203), [...d[f(214)].scene[f(186)]]);
        const m = this[f(204)](d);
        s.push(...m.models), i[f(255)](...m[f(264)]), r[f(255)](...m[f(258)]);
      });
    }
    return { models: s, lights: i, animations: r };
  }
  [ce(199)](e, t) {
    const n = ce;
    for (let s = 0; s < e[n(190)]; s++) {
      const i = e[s];
      if (i[n(206)] === t)
        return i;
    }
    return null;
  }
  createModelContainer(e, t) {
    const n = ce, s = { name: e[n(206)], model: e };
    switch (this[n(260)](e, t), e[n(248)] = t[n(248)], e[n(232)] = t[n(232)], e[n(237)].type) {
      case "bgMesh":
        break;
      case "interactable":
        const i = this.getHtml(t, e[n(206)]);
        s.contentType = i.type, s[n(222)] = i.content;
        break;
      case n(202):
        break;
      case n(225):
        break;
    }
    return s;
  }
  [ce(239)](e, t) {
    return { type: e, light: t };
  }
  processModel(e) {
    const t = ce, n = [...e[t(214)][t(278)][t(186)]], s = e[t(214)][t(258)], i = [], r = [], a = 1e5;
    for (let c = 0; c < n[t(190)]; c++) {
      const u = n[c];
      switch (u.layers[t(266)](), u[t(271)]) {
        case t(269):
          i.push(this[t(254)](u, e[t(208)]));
          break;
        case "Group":
          u[t(186)].forEach((d) => {
            const f = t;
            this[f(260)](d, e[f(208)]);
          }), i[t(255)](this.createModelContainer(u, e[t(208)]));
          break;
        case t(188):
          i[t(255)](this.createModelContainer(u, e[t(208)]));
          break;
        case t(187):
          u[t(215)] /= a, r.push(this[t(239)](t(250), u));
          break;
        case t(259):
          u[t(215)] /= a, r.push(this[t(239)](t(272), u));
          break;
        case t(280):
          u.intensity /= a, r.push(this[t(239)](t(245), u));
          break;
        default:
          console[t(243)](":>> GLTF element unrecognized:", u);
          break;
      }
      this[t(278)][t(285)](u);
    }
    return { models: i, lights: r, animations: s };
  }
  [ce(260)](e, t) {
    const n = ce;
    e[n(210)][n(193)](e[n(210)].x + t.position.x, e[n(210)].y + t[n(210)].y, e[n(210)].z + t.position.z), e[n(251)].set(t.rotation.x, t[n(261)].y, t.rotation.z, t.rotation.w), e[n(279)][n(193)](t[n(279)].x, t.scale.y, t[n(279)].z);
  }
  getHtml(e, t) {
    const n = ce, s = this[n(252)](e, t);
    if (s[n(222)] !== void 0)
      return s.type === n(240) && (s.content = n(197) + s[n(222)] + n(238)), s;
  }
  getHtmlData(e, t) {
    const n = ce, s = e[n(228)];
    for (let i = 0; i < s[n(190)]; i++) {
      const r = s[i];
      if (r[n(242)] === t)
        return r;
    }
    return null;
  }
  async loadModel(e, t) {
    return new Promise((n) => {
      const s = Ke;
      return this[s(201)][s(194)](".." + e[s(267)], function(i) {
        n({ gltf: i, jsonData: e });
      }, t, function(i) {
        console.log(s(233) + i);
      });
    });
  }
  addLighting(e) {
    const t = ce, n = [];
    for (let s = 0; s < e[t(190)]; s++) {
      const i = e[s];
      let r, a;
      const c = { type: null, light: null };
      switch (i[t(271)]) {
        case t(217):
          this[t(212)](i[t(267)], i.backgroundIntensity, i.backgroundBlurriness);
          break;
        case t(275):
          this[t(227)](i[t(267)], i.backgroundIntensity, i[t(231)]);
          break;
        case "pointLight":
          r = new Q.Vector3(i[t(210)].x, i[t(210)].y, i.position.z), a = this[t(277)](r, i[t(211)], i[t(215)], i[t(246)], i.castShadow), c[t(271)] = t(235), c[t(244)] = a;
          break;
        case t(219):
          r = new Q[t(220)](i[t(210)].x, i[t(210)].y, i[t(210)].z);
          const u = new Q[t(220)](i.target.x, i[t(198)].y, i[t(198)].z);
          a = this.addDirectionalLight(r, u, i[t(211)], i[t(215)], i[t(248)]), c.type = t(219), c[t(244)] = a;
          break;
        case t(213):
          a = this.addAmbientLight(i[t(211)], i[t(215)]), c.type = t(213), c.light = a;
          break;
      }
      n[t(255)](c);
    }
    return n;
  }
  [ce(277)](e, t = 0, n = 1, s = 1500, i = ![]) {
    const r = ce, a = new Q[r(187)](t, n, s);
    if (a[r(210)][r(263)](e, 1), a[r(248)] = i, a.normalBias = 0.1, this[r(278)].add(a), window[r(282)]) {
      const c = new Q[r(189)](a, 0.25);
      this[r(278)][r(285)](c);
    }
    return a;
  }
  [ce(221)](e = 0, t = 1) {
    const n = ce, s = new Q[n(192)](e, t);
    return this[n(278)][n(285)](s), s;
  }
  [ce(253)](e, t = new Q[ce(220)](0, 0, 0), n = 16777215, s = 2, i = ![]) {
    const r = ce, a = new Q[r(259)](n, s);
    if (a.position[r(263)](e, 1), a[r(198)][r(210)][r(263)](t, 1), a[r(248)] = i, a[r(241)] = 0.1, this[r(278)].add(a), this[r(278)].add(a[r(198)]), window[r(282)]) {
      const c = new Q[r(218)](a);
      this[r(278)][r(285)](c);
    }
    return a;
  }
  addHDR(e, t, n) {
    const s = ce, i = new Q[s(265)](this[s(273)]);
    i[s(289)]();
    let r;
    new Vr()[s(194)](".." + e, (a) => {
      const c = s;
      r = i.fromEquirectangular(a)[c(249)], this[c(278)].environment = r, this.scene.background = r, this.scene[c(224)] = t, this[c(278)][c(231)] = n, a[c(270)](), i[c(270)]();
    });
  }
  [ce(227)](e, t, n) {
    const s = ce, i = new Q[s(265)](this[s(273)]);
    i.compileEquirectangularShader();
    let r;
    new ii()[s(194)](".." + e, (a) => {
      const c = s;
      a[c(191)] = Q[c(268)], r = i.fromEquirectangular(a).texture, this.scene.environment = r, this.scene[c(286)] = r, this[c(278)][c(224)] = t, this[c(278)][c(231)] = n, a.dispose(), i[c(270)]();
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
const ui = new Dn(-1, 1, 1, -1, 0, 1), an = new on();
an.setAttribute("position", new Pn([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
an.setAttribute("uv", new Pn([0, 2, 0, 0, 2, 0], 2));
class Xn {
  constructor(e) {
    this._mesh = new kn(an, e);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(e) {
    e.render(this._mesh, ui);
  }
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
const Kn = {
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
}, hi = {
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
class st extends Tt {
  constructor(e, t, n, s) {
    super(), this.strength = t !== void 0 ? t : 1, this.radius = n, this.threshold = s, this.resolution = e !== void 0 ? new Re(e.x, e.y) : new Re(256, 256), this.clearColor = new Me(0, 0, 0), this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
    let i = Math.round(this.resolution.x / 2), r = Math.round(this.resolution.y / 2);
    this.renderTargetBright = new Rt(i, r), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
    for (let f = 0; f < this.nMips; f++) {
      const m = new Rt(i, r);
      m.texture.name = "UnrealBloomPass.h" + f, m.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(m);
      const A = new Rt(i, r);
      A.texture.name = "UnrealBloomPass.v" + f, A.texture.generateMipmaps = !1, this.renderTargetsVertical.push(A), i = Math.round(i / 2), r = Math.round(r / 2);
    }
    const a = hi;
    this.highPassUniforms = en.clone(a.uniforms), this.highPassUniforms.luminosityThreshold.value = s, this.highPassUniforms.smoothWidth.value = 0.01, this.materialHighPassFilter = new $e({
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
    const u = [1, 0.8, 0.6, 0.4, 0.2];
    this.compositeMaterial.uniforms.bloomFactors.value = u, this.bloomTintColors = [new Le(1, 1, 1), new Le(1, 1, 1), new Le(1, 1, 1), new Le(1, 1, 1), new Le(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;
    const d = Kn;
    this.copyUniforms = en.clone(d.uniforms), this.copyUniforms.opacity.value = 1, this.materialCopy = new $e({
      uniforms: this.copyUniforms,
      vertexShader: d.vertexShader,
      fragmentShader: d.fragmentShader,
      blending: lr,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this.enabled = !0, this.needsSwap = !1, this._oldClearColor = new Me(), this.oldClearAlpha = 1, this.basic = new qe(), this.fsQuad = new Xn(null);
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
      this.fsQuad.material = this.separableBlurMaterials[c], this.separableBlurMaterials[c].uniforms.colorTexture.value = a.texture, this.separableBlurMaterials[c].uniforms.direction.value = st.BlurDirectionX, e.setRenderTarget(this.renderTargetsHorizontal[c]), e.clear(), this.fsQuad.render(e), this.separableBlurMaterials[c].uniforms.colorTexture.value = this.renderTargetsHorizontal[c].texture, this.separableBlurMaterials[c].uniforms.direction.value = st.BlurDirectionY, e.setRenderTarget(this.renderTargetsVertical[c]), e.clear(), this.fsQuad.render(e), a = this.renderTargetsVertical[c];
    this.fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, e.setRenderTarget(this.renderTargetsHorizontal[0]), e.clear(), this.fsQuad.render(e), this.fsQuad.material = this.materialCopy, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, i && e.state.buffers.stencil.setTest(!0), this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(n), this.fsQuad.render(e)), e.setClearColor(this._oldClearColor, this.oldClearAlpha), e.autoClear = r;
  }
  getSeperableBlurMaterial(e) {
    return new $e({
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
    return new $e({
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
st.BlurDirectionX = new Re(1, 0);
st.BlurDirectionY = new Re(0, 1);
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
    super(), this.textureID = t !== void 0 ? t : "tDiffuse", e instanceof $e ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = en.clone(e.uniforms), this.material = new $e({
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
class vn extends Tt {
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
    this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new fi(Kn), this.clock = new ur();
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
        vn !== void 0 && (r instanceof vn ? n = !0 : r instanceof di && (n = !1));
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
const ke = rt;
(function(h, e) {
  const t = rt, n = h();
  for (; []; )
    try {
      if (-parseInt(t(496)) / 1 + parseInt(t(499)) / 2 + -parseInt(t(461)) / 3 * (parseInt(t(490)) / 4) + -parseInt(t(483)) / 5 + -parseInt(t(488)) / 6 + parseInt(t(507)) / 7 + parseInt(t(477)) / 8 === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Ut, 551800);
function rt(h, e) {
  const t = Ut();
  return rt = function(n, s) {
    return n = n - 460, t[n];
  }, rt(h, e);
}
function Ut() {
  const h = ["error", "14866192FCJJiX", "scene", "width", "radius", "Vector2", "scrollHeight", "5019535xvQPCa", "threshold", "Cache", "fov", "getElementById", "2761596OydyPe", "strength", "4DlWlar", ");  ", "bloomParams", "getRenderer", "toneMappingExposure", "Camera", "958649vgCisl", "camera", "setSize", "1193462MRlWRn", "shadowMap", "renderer", "cameraParams", "render", "name", "onWindowResized", "postEffects", "6402725hRsEMz", "height", "enabled", "high-performance", "1185174YznkUA", "layers", "isPostEffectsEnabled", "scrollWidth", "setupRenderer", "bloomPass", "toneMapping", "exposure", "reset", "canvas", "gammaFactor", "addPass", "finalComposer", "WebGLRenderer", "Scene"];
  return Ut = function() {
    return h;
  }, Ut();
}
class mi {
  constructor(e, t) {
    const n = rt;
    Q[n(485)][n(509)] = !![], this.canvas = document[n(487)](e), !this[n(470)] && console[n(476)]("Canvas not found. Make sure this returns the correct element: document.GetElementByID(", e, n(491)), this.cameraParams = t, this[n(492)] = t[n(506)].bloom, this[n(479)] = this[n(470)][n(464)], this.height = this[n(470)].scrollHeight, this[n(497)] = new Q.PerspectiveCamera(this[n(502)][n(486)], this[n(479)] / this[n(508)], 0.1, 1e4), this[n(497)][n(504)] = n(495), this[n(478)] = new Q[n(475)](), this[n(501)], this[n(473)], this[n(466)], this[n(463)] = t[n(506)][n(509)], this[n(465)](), this.isPostEffectsEnabled && this.setupPostEffects();
  }
  getCamera() {
    return this[rt(497)];
  }
  getScene() {
    return this.scene;
  }
  [ke(493)]() {
    return this[ke(501)];
  }
  setupRenderer() {
    const e = ke;
    this.renderer = new Q[e(474)]({ canvas: this[e(470)], antialias: !![], powerPreference: e(460), failIfMajorPerformanceCaveat: !![] }), this[e(501)][e(500)].enabled = !![], this.camera[e(462)].enableAll(), this[e(501)][e(498)](this.width, this[e(508)]), this[e(501)][e(467)] = Q.ReinhardToneMapping, this[e(501)][e(494)] = Math.pow(this.bloomParams[e(468)], 4), this[e(501)][e(471)] = 4;
  }
  setupPostEffects() {
    const e = ke, t = new xi(this.scene, this[e(497)]), n = new st(new Q[e(481)](this.width, this[e(508)]), this[e(492)][e(489)], this[e(492)].radius, this[e(492)].threshold);
    n[e(468)] = this[e(492)][e(468)], n[e(484)] = this[e(492)][e(484)], n[e(489)] = this[e(492)][e(489)], n[e(480)] = this[e(492)][e(480)], this[e(473)] = new pi(this[e(501)]), this[e(473)][e(498)](this[e(479)], this[e(508)]), this[e(473)][e(472)](t), this.finalComposer[e(472)](n);
  }
  [ke(505)]() {
    const e = ke;
    this[e(479)] = this.canvas.scrollWidth, this.height = this[e(470)][e(482)], this[e(497)].aspect = this[e(479)] / this[e(508)], this[e(497)].updateProjectionMatrix(), this[e(501)][e(498)](this[e(479)], this.height), this[e(463)] && this[e(473)][e(498)](this[e(479)], this.height);
  }
  [ke(469)]() {
    this[ke(505)]();
  }
  [ke(503)]() {
    const e = ke;
    this.isPostEffectsEnabled ? this.finalComposer[e(503)]() : this[e(501)][e(503)](this[e(478)], this[e(497)]);
  }
}
const we = Pt;
(function(h, e) {
  const t = Pt, n = h();
  for (; []; )
    try {
      if (parseInt(t(156)) / 1 * (-parseInt(t(117)) / 2) + -parseInt(t(163)) / 3 * (parseInt(t(113)) / 4) + parseInt(t(164)) / 5 + -parseInt(t(180)) / 6 + -parseInt(t(177)) / 7 + parseInt(t(148)) / 8 + parseInt(t(111)) / 9 * (parseInt(t(175)) / 10) === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Ft, 651974);
function Pt(h, e) {
  const t = Ft();
  return Pt = function(n, s) {
    return n = n - 109, t[n];
  }, Pt(h, e);
}
function Ft() {
  const h = ["addEventListener", "dispatchEvent", "onPointerMove", "auto", "left", "240UvqCIU", "215930bmoEHl", "pointerdown", "none", "min", "removeEventListener", "width", "pointerType", "intersectObjects", "_camera", "dispose", "mouse", "30FBTlrm", "name", "2904664Fymzrb", "hoveroff", "activate", "4847046JMbaGB", "frame", "_selected", "Vector2", "Click discarded: ", "5415237unhcuW", "_objects", "3024jAFUag", "Click registered: ", "raycastTarget", "height", "2148082TkugZO", "minStaticFrames", "touches", "mouseup", "cursor", "enabled", "onPointerUp", "getObjects", "getHitObject", "updatePointer", "style", "touchAction", "_intersections", "pointer", "setFromCamera", "Raycaster", "_domElement", "halfWindowWidth", "length", "hoveron", "push", "getBoundingClientRect", "pointermove", "object", "intersectableObjects", "clientY", "touchend", "_hovered", "DEBUG_xyz3d", "getIntersectableObjects", "EventDispatcher", "9288184UTUalt", "deactivate", "MAX_SAFE_INTEGER", "log", "fps", "pen", "top", "transformGroup", "1yAFtNh", "clientX"];
  return Ft = function() {
    return h;
  }, Ft();
}
const ft = new Q[we(132)]();
class gi extends Q[we(147)] {
  constructor(e, t, n) {
    const s = we;
    super(), this[s(112)] = e, this[s(172)] = t, this._domElement = n, this[s(182)] = null, this[s(144)] = null, this[s(129)] = [], this[s(152)] = 30, this[s(122)] = !![], this[s(155)] = ![], this[s(134)] = window.innerWidth / 2, this[s(134)] = window.innerHeight / 2, this[s(181)] = 0, this[s(118)] = this[s(152)], this[s(141)] = this.getIntersectableObjects(this._objects), this[s(130)] = new Q[s(109)](), this.onPointerMove = (i) => {
      const r = s;
      if (this[r(122)] !== ![] && (this[r(181)] += 1, this.frame > Number[r(150)] && (this[r(181)] = 0), this.updatePointer(i), ft[r(131)](this[r(130)], this._camera), this[r(141)] == null && (this[r(141)] = getIntersectableObjects(this[r(112)])), i[r(170)] === r(174) || i.pointerType === r(153) || i.pointerType === "touch"))
        if (this[r(129)][r(135)] = 0, ft[r(131)](this[r(130)], this._camera), ft.intersectObjects(this[r(141)], ![], this[r(129)]), this[r(129)][r(135)] > 0) {
          let a = this[r(129)][0].object;
          a = this.getHitObject(a[r(176)]), this[r(144)] !== a && this[r(144)] !== null && (this.dispatchEvent({ type: r(178), object: this[r(144)] }), this[r(133)][r(127)].cursor = "auto", this[r(144)] = null), this[r(144)] !== a && (this.dispatchEvent({ type: r(136), object: a }), this[r(133)][r(127)].cursor = r(130), this[r(144)] = a);
        } else
          this[r(144)] !== null && (this[r(159)]({ type: r(178), object: this[r(144)] }), this[r(133)][r(127)].cursor = r(161), this[r(144)] = null);
    }, this.onPointerUp = (i) => {
      const r = s;
      if (this[r(122)] !== ![] && !(typeof i === TouchEvent && i[r(119)].length > 1)) {
        if (this.frame > Math[r(167)](this.fps * 2, 20)) {
          window.DEBUG_xyz3d && console[r(151)](r(110), this[r(181)], ">", Math[r(167)](this[r(152)] * 2, 20)), this[r(181)] = 0;
          return;
        }
        if (window[r(145)] && console.log(r(114), this[r(181)], ">", Math[r(167)](this[r(152)] * 2, 20)), this[r(181)] = 0, (this[r(141)] == null || this[r(141)] == null) && (this[r(141)] = getIntersectableObjects(this[r(112)])), this._domElement.style[r(128)] = r(166), this[r(126)](i), this[r(129)][r(135)] = 0, ft.setFromCamera(this[r(130)], this[r(172)]), ft[r(171)](this.intersectableObjects, ![], this[r(129)]), this._intersections[r(135)] > 0) {
          const a = this[r(129)][0][r(140)];
          this[r(182)] = this[r(125)](a[r(176)]), this[r(159)]({ type: r(165), object: this._selected }), this[r(144)] = this[r(182)];
        }
      }
    }, this.activate();
  }
  [we(179)]() {
    const e = we;
    this[e(133)][e(158)](e(139), this[e(160)]), this[e(133)][e(158)](e(143), this[e(123)]), this[e(133)].addEventListener(e(120), this.onPointerUp);
  }
  deactivate() {
    const e = we;
    this._domElement.removeEventListener(e(139), this[e(160)]), this[e(133)][e(168)](e(143), this.onPointerUp), this._domElement[e(168)]("mouseup", this[e(123)]), this[e(133)].style[e(121)] = "";
  }
  updatePointer(e) {
    const t = we, n = this[t(133)][t(138)]();
    this.pointer.x = (e[t(157)] - n[t(162)]) / n[t(169)] * 2 - 1, this[t(130)].y = -(e[t(142)] - n[t(154)]) / n[t(116)] * 2 + 1;
  }
  [we(173)]() {
    this[we(149)]();
  }
  [we(124)]() {
    return this._objects;
  }
  [we(146)](e) {
    const t = we, n = [];
    for (let s = 0; s < e[t(135)]; s++) {
      const i = e[s];
      n[t(137)](i[t(115)]);
    }
    return n;
  }
  [we(125)](e) {
    const t = we;
    for (let n = 0; n < this._objects[t(135)]; n++) {
      const s = this[t(112)][n];
      if (s[t(115)][t(176)] === e)
        return s;
    }
    return null;
  }
}
const V = gt;
function gt(h, e) {
  const t = Bt();
  return gt = function(n, s) {
    return n = n - 205, t[n];
  }, gt(h, e);
}
(function(h, e) {
  const t = gt, n = h();
  for (; []; )
    try {
      if (-parseInt(t(281)) / 1 * (-parseInt(t(251)) / 2) + -parseInt(t(272)) / 3 + -parseInt(t(253)) / 4 * (parseInt(t(267)) / 5) + parseInt(t(293)) / 6 + -parseInt(t(258)) / 7 + parseInt(t(245)) / 8 + parseInt(t(205)) / 9 * (-parseInt(t(319)) / 10) === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Bt, 505543);
class bi {
  constructor(e, t) {
    const n = gt;
    Et[n(254)]({ THREE: e }), this[n(238)] = !![], this[n(270)] = ![], this.raycastManager, this.controls, this[n(266)], this.targetPosition, this[n(230)], this.sceneWrapper, this[n(292)], this[n(217)] = 0.05, this[n(255)] = 0.05, this.cameraParams = t, this[n(294)] = 0, this[n(288)] = 0, this[n(229)] = 0, this.maxGyroSignals = 512, this.tiltXArr = new Array(this[n(310)]).fill(0), this.tiltYArr = new Array(this[n(310)])[n(287)](0), this.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), this.fitCameraOffset = this[n(231)] ? 1.5 : 3, this[n(259)] = new Q[n(315)]();
  }
  [V(247)](e, t, n, s, i, r) {
    const a = V;
    this[a(297)] = e, this[a(266)] = t, this.sceneWrapper = n, this[a(230)] = s, this[a(323)] = i, this[a(222)] = r, this[a(292)] = this[a(232)].getSceneZoneByIndex(this.activeZoneIndex), this[a(295)](), this[a(243)](), this.setupRaycaster(), this.resetCamera();
  }
  [V(295)]() {
    const e = V;
    if (this[e(302)][e(307)])
      try {
        let t = new Gyroscope({ frequency: 15 });
        t.addEventListener("reading", (n) => {
          const s = e;
          this[s(208)].push(t.y * 2), this[s(265)].push(t.x * 2), this.tiltX = vt.average(this.tiltXArr), this[s(229)] = vt.average(this[s(265)]), this[s(208)].length > this.maxGyroSignals && (this[s(208)][s(299)](), this[s(265)][s(299)]());
        }), t.start();
      } catch (t) {
        console[e(301)](e(286), t);
      }
  }
  [V(243)]() {
    const e = V;
    this[e(266)][e(236)][e(325)](this[e(292)][e(256)], 1), this[e(266)].lookAt(this.activeSceneZone[e(309)]), this.fitCameraToZone(this[e(316)]), this.controls && this[e(285)].dispose(), this.controls = new Et(this[e(266)], this.renderer[e(304)]), this[e(285)][e(216)] = 0.1, this[e(312)]();
  }
  [V(312)]() {
    const e = V;
    this[e(302)][e(321)] !== !![] && (this.controls[e(227)][e(300)] = Et[e(308)][e(224)], this[e(285)].touches[e(322)] = Et[e(308)][e(234)], this.controls[e(244)] = this[e(285)][e(324)] + this[e(255)], this[e(285)][e(228)] = this[e(285)][e(324)] - this[e(255)], this.controls[e(260)] = this[e(285)][e(313)] + this[e(255)], this[e(285)][e(209)] = this[e(285)][e(313)] - this[e(255)], this[e(285)][e(219)] = this[e(285)].distance * 2, this.controls[e(237)] = this.controls.distance * 2, this[e(259)] = new Q.Vector2(this[e(285)][e(324)], this[e(285)][e(313)]));
  }
  [V(226)]() {
    const e = V;
    this[e(213)] && this[e(213)].dispose();
    const t = this[e(232)][e(235)](this[e(292)][e(274)]);
    this[e(213)] = new gi(t, this[e(266)], this.renderer[e(304)]), this[e(213)][e(225)](e(282), this.onPointerDown[e(318)](this)), this[e(213)].addEventListener(e(303), this[e(223)][e(318)](this)), this.raycastManager[e(225)](e(271), this[e(320)][e(318)](this));
  }
  [V(211)]() {
    const e = V;
    this[e(294)] += 1, this[e(232)][e(220)][e(263)] <= this[e(294)] && (this[e(294)] = 0), this[e(261)](this[e(294)]);
  }
  [V(261)](e, t = 0.01) {
    const n = V, s = this[n(232)].getSceneZoneByIndex(e);
    this[n(294)] = e, this.changeCameraZone(s, t);
  }
  [V(279)](e, t = 0.01) {
    const n = V, s = this[n(232)][n(246)](e);
    this[n(294)] = s[n(215)], this[n(269)](s[n(262)], t);
  }
  [V(269)](e, t = 0.01) {
    const n = V;
    this[n(292)] = e;
    const s = this[n(210)](this[n(316)]);
    this[n(218)](![]), this[n(250)](e.boxCenter, e.lookAtTarget, s, t)[n(296)](() => {
      const i = n;
      this[i(285)][i(268)](), this[i(312)](), this.setInputActive(!![]);
    }), this[n(226)]();
  }
  fitCameraToZone(e = 3) {
    const t = V, n = Math.max(this[t(292)][t(278)].x, this[t(292)].lookAtTargetSize.y, this[t(292)].lookAtTargetSize.z), s = n / (2 * Math[t(306)](Math.PI * this.camera.fov / 360)), i = s / this[t(266)][t(252)], r = e * Math[t(257)](s, i), a = this.activeSceneZone[t(309)][t(240)]()[t(264)](this[t(266)][t(236)])[t(289)]()[t(241)](r);
    return this[t(266)][t(236)][t(317)](this[t(292)][t(309)])[t(264)](a), this.camera[t(290)](this.activeSceneZone[t(309)]), this[t(266)].position[t(221)](this[t(292)][t(309)]);
  }
  setInputActive(e) {
    const t = V;
    this[t(238)] = e, this[t(213)][t(238)] = e, this.controls.enabled = e;
  }
  setPaused(e) {
    const t = V;
    this[t(270)] = e, this.enabled = !e, this[t(213)].enabled = !e;
  }
  resetCamera(e = !![]) {
    const t = V;
    this[t(238)] && (this.moveCamera(this[t(292)].boxCenter, e), this.setLookAt(this[t(292)][t(256)], this[t(292)][t(309)], e), this[t(285)][t(214)](e));
  }
  [V(207)](e = 0.05) {
    const t = V;
    this[t(285)].smoothTime = e * 50;
  }
  [V(212)](e, t = !![]) {
    const n = V;
    this[n(285)][n(273)](e, t);
  }
  setLookAt(e, t, n = !![]) {
    const s = V;
    return this[s(285)][s(311)](e.x, e.y, e.z, t.x, t.y, t.z, n);
  }
  [V(242)](e, t = !![]) {
    const n = V;
    return this[n(285)][n(206)](e.x, e.y, e.z, !![]);
  }
  setCameraOffset(e) {
    const t = V;
    this[t(266)].filmOffset = e, this[t(266)][t(277)]();
  }
  [V(250)](e, t, n, s = 0.04, i = !![]) {
    const r = V;
    return e = e[r(264)](t)[r(233)](n)[r(283)](t), this.setDampFactor(s), this.controls[r(311)](e.x, e.y, e.z, t.x, t.y, t.z, i);
  }
  [V(291)](e) {
    const t = V;
    e[t(314)] === null || !this[t(238)] || (this.raycastManager[t(238)] = ![], this.pointerDownCallback(e[t(314)]));
  }
  [V(223)](e) {
    const t = V;
    e.object !== null && this[t(323)](e.object);
  }
  [V(320)](e) {
    const t = V;
    e[t(314)] !== null && this[t(222)](e[t(314)]);
  }
  [V(284)]() {
    const e = V;
    if (this[e(285)][e(276)] || this[e(302)][e(321)])
      return;
    const t = this.controls[e(305)] == 32 || this[e(285)][e(305)] == 1;
    let n = -1, s = 1;
    !t && (this.cameraParams[e(275)] && this[e(213)][e(280)].x && (this[e(259)].x = this.raycastManager[e(280)].x + this[e(285)][e(324)], this[e(259)].y = -this.raycastManager[e(280)].y + this[e(285)][e(313)], this.rotationTarget.x = vt.map(this[e(259)].x, this[e(285)][e(324)] + n, this.controls[e(324)] + s, this[e(285)].minAzimuthAngle, this[e(285)].maxAzimuthAngle), this[e(259)].y = vt[e(298)](this.rotationTarget.y, this[e(285)][e(313)] + n, this[e(285)].polarAngle + s, this[e(285)].minPolarAngle, this[e(285)].maxPolarAngle)), this.isMobileDevice && this.cameraParams.gyro && (this[e(259)].x = this[e(288)] + this[e(285)][e(324)], this[e(259)].y = this[e(229)] + this[e(285)][e(313)]), this.controls[e(239)](this.rotationTarget.x, this[e(259)].y, ![]));
  }
  update(e) {
    const t = V;
    this[t(285)] !== null && (this[t(213)][t(248)] = e * 1e3, !this[t(270)] && (this[t(284)](), this.controls[t(249)](e)));
  }
}
function Bt() {
  const h = ["4402293SHCrFc", "rotationTarget", "maxPolarAngle", "changeSceneZoneByIndex", "zoneBox", "length", "sub", "tiltYArr", "camera", "15715VTnUMS", "saveState", "changeCameraZone", "paused", "hoveroff", "86280UFlclV", "zoomTo", "zone", "followMouse", "active", "updateProjectionMatrix", "lookAtTargetSize", "changeSceneZoneByName", "pointer", "127yBBGAj", "pointerdown", "add", "rotateCamera", "controls", "The gryto motion sensor is not supported on this device.", "fill", "tiltX", "normalize", "lookAt", "onPointerDown", "activeSceneZone", "5914962TlgmXg", "activeZoneIndex", "setupGyro", "then", "renderer", "map", "pop", "right", "log", "cameraParams", "hoveron", "domElement", "currentAction", "atan", "gyro", "ACTION", "lookAtTarget", "maxGyroSignals", "setLookAt", "resetControlsLimits", "polarAngle", "object", "Vector2", "fitCameraOffset", "copy", "bind", "105620lcEGlt", "onHoverOff", "orbit", "two", "hoverOverCallback", "azimuthAngle", "lerp", "738MDVzRp", "moveTo", "setDampFactor", "tiltXArr", "minPolarAngle", "fitCameraToZone", "nextSceneZone", "setZoom", "raycastManager", "reset", "index", "restThreshold", "defaultDampFactor", "setInputActive", "maxDistance", "wrappedSceneZones", "distanceTo", "hoverOffCallback", "onHoverOver", "ROTATE", "addEventListener", "setupRaycaster", "mouseButtons", "minAzimuthAngle", "tiltY", "pointerDownCallback", "isMobileDevice", "sceneWrapper", "setLength", "TOUCH_ZOOM", "getInteractablesByZone", "position", "maxZoom", "enabled", "rotateTo", "clone", "multiplyScalar", "moveCamera", "setupCamera", "maxAzimuthAngle", "5367744hXbvea", "getSceneZoneByName", "init", "fps", "update", "orbitCameraTo", "12152JbBFnd", "aspect", "508lGRFlS", "install", "defaultRotationDistance", "boxCenter", "max"];
  return Bt = function() {
    return h;
  }, Bt();
}
function Ht() {
  const h = ["184ghAIyZ", "showLoadingScreen", "innerHTML", "1NcTwNA", "history", "141458NtbGHG", "3897384eSRXwE", "closeDynamicContent", "loadingScreen", "insertAdjacentHTML", "10548NjwQbx", ".XYZ3d-close", "add", "isOverlayActive", "hash", "remove", "setDynamicContent", "iframe not found. Make sure this returns the correct element: document.getElementById(", "2900430TDYYzr", "showDynamicHTML", "XYZ3d-hidden", "addDynamicCloseButton", "2963864xxOPcc", "3129203cWVqJX", "openLink", "pushHashURL", "hiddenSelector", "setDynamicHTML", "loadingScreen not found. Make sure this returns the correct element: document.getElementById(", "beforeend", "visibleSelector", ");  ", "395739QdFWzb", "getElementById", '<div id="XYZ3d-close-btn" class="XYZ3d-close-btn"><span>✕</span', "error", "classList", "190eqKmYc", "addEventListener", "pushState", "contentContainer"];
  return Ht = function() {
    return h;
  }, Ht();
}
const _e = bt;
function bt(h, e) {
  const t = Ht();
  return bt = function(n, s) {
    return n = n - 144, t[n];
  }, bt(h, e);
}
(function(h, e) {
  const t = bt, n = h();
  for (; []; )
    try {
      if (parseInt(t(171)) / 1 * (-parseInt(t(173)) / 2) + -parseInt(t(178)) / 3 * (-parseInt(t(168)) / 4) + parseInt(t(145)) / 5 + parseInt(t(174)) / 6 + -parseInt(t(150)) / 7 + parseInt(t(149)) / 8 + -parseInt(t(159)) / 9 * (parseInt(t(164)) / 10) === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Ht, 408662);
class _i {
  constructor(e, t) {
    const n = bt;
    this[n(181)] = ![], this.hiddenSelector = n(147), this.visibleSelector = "XYZ3d-visible", this.contentContainer = document[n(160)](e), this.loadingScreen = document[n(160)](t), !this[n(167)] && console[n(162)](n(144), e, n(158)), !this[n(176)] && console.error(n(155), t, n(158));
  }
  [_e(169)](e, t = null) {
    const n = _e;
    this[n(181)] = e, e == !![] || this[n(176)][n(183)](), t != null && (this.loadingScreen[n(183)](), t());
  }
  [_e(152)](e = "", t = !![]) {
    const n = _e;
    window[n(172)][n(166)] && t ? window.history[n(166)](null, null, e) : location[n(182)] = e;
  }
  [_e(146)](e = !![]) {
    const t = _e;
    this[t(181)] = e, e ? (this[t(167)][t(163)][t(180)](this[t(157)]), this[t(167)][t(163)][t(183)](this[t(153)])) : (this[t(167)][t(163)][t(180)](this[t(153)]), this[t(167)][t(163)][t(183)](this[t(157)]), this[t(152)]("", ![]));
  }
  [_e(154)](e) {
    const t = _e;
    this[t(167)][t(170)] = e;
  }
  [_e(148)](e) {
    const t = _e;
    let n = t(161);
    this[t(167)][t(177)](t(156), n), n = this[t(167)].querySelector("#XYZ3d-close-btn"), n[t(165)]("click", () => {
      this[t(146)](![]), e();
    });
  }
  [_e(184)](e, t, n) {
    const s = _e;
    this[s(154)](e), this[s(148)](t), this.pushHashURL(n);
  }
  [_e(151)](e) {
    window.open(e);
  }
  [_e(175)](e) {
    const t = _e;
    this[t(167)].querySelector(t(179)) && (e(), this.contentContainer[t(170)] = "");
  }
}
(function(h, e) {
  const t = ge, n = h();
  for (; []; )
    try {
      if (-parseInt(t(231)) / 1 + parseInt(t(253)) / 2 + -parseInt(t(265)) / 3 * (parseInt(t(216)) / 4) + parseInt(t(205)) / 5 + -parseInt(t(229)) / 6 * (-parseInt(t(224)) / 7) + -parseInt(t(250)) / 8 + parseInt(t(274)) / 9 * (parseInt(t(218)) / 10) === e)
        break;
      n.push(n.shift());
    } catch {
      n.push(n.shift());
    }
})(Gt, 926443);
function ge(h, e) {
  const t = Gt();
  return ge = function(n, s) {
    return n = n - 205, t[n];
  }, ge(h, e);
}
function Gt() {
  const h = ["loadingScreenID", "getRenderer", "69402PLxktW", "stopAllAction", "1265015ClszUm", "getDelta", "onPointerDownCallback", "Clock", "domElements", "back", "showLoadingScreen", "enabled", "build", "render", "length", "setPaused", "getCamera", "link", "raycastTarget", "setLoop", "iframe", "jsonPath", "onProgressLoading", "5652768gPSpqb", "nextScene", "contentType", "2455352LLHIJZ", "animation", "element", "duration", "onHoverOverCallback", "looping", "onClick", "play", "onHoverOffCallback", "NoBlending", "keys", "all", "12741NyEMNo", "resetCamera", "zeroSlopeAtEnd", "canvasID", "animations", "showDynamicHTML", "addEventListener", "onhashchange", "closeDynamicContent", "2539179xXVftn", "6961110icAnNV", "hash", "resize", "onUpdate", "setup", "init", "history", "goToZone", "AnimationMixer", "changeSceneZoneByName", "reset", "1420YWuXVN", "setDynamicContent", "10QvNTev", "camera", "getLoopingAnimations", "goToNextZone", "getScene", "onHover", "910ajxgZx", "update", "clipAction"];
  return Gt = function() {
    return h;
  }, Gt();
}
class wi {
  constructor(e) {
    const t = ge;
    let n = this, s = null, i, r, a, c, u, d, f = null, m, A;
    window.DEBUG_xyz3d = e.debug;
    async function U() {
      const _ = ge;
      s = new mi(e[_(235)][_(268)], e[_(219)]), i = new bi(Q, e[_(219)]), r = new _i(e[_(235)].iframeID, e.domElements[_(227)]), r[_(237)](!![]);
      const T = s[_(222)]();
      f = s[_(243)]();
      const Z = s[_(228)]();
      c = await new li(T, Z, e[_(248)])[_(239)]((ee, ne, te) => {
        const se = _;
        n.onProgressLoading && n[se(249)](ee, ne, Math.round(te));
      }), m = new Q[_(234)](), a = new Q[_(213)](T);
      const j = c[_(220)]();
      return z(_(258), j, !![]), i[_(210)](Z, f, c, H, L, W), r[_(237)](![], N), B(), M(), { camera: f, scene: T, renderer: Z, sceneWrapper: c };
    }
    function B() {
      const _ = ge;
      window[_(272)] = function() {
        const T = _;
        location[T(206)] == "" ? r[T(273)](N) : window.history.back && window[T(211)][T(236)]();
      }, window[_(271)](_(207), () => {
        N();
      }, ![]);
    }
    function M() {
      const _ = ge;
      requestAnimationFrame(M), !r.isOverlayActive && (A = m[_(232)](), a[_(225)](A), i[_(225)](A), s[_(240)](), n[_(208)] && n[_(208)](A));
    }
    function N(_ = !![]) {
      const T = ge;
      s[T(215)](), i[T(266)](_);
    }
    async function z(_, T, Z = ![], P = ![], j = null) {
      function ee(te) {
        const se = ge;
        return Object[se(263)](te)[se(241)] === 0;
      }
      return ee(T) === !![] || !(_ in T) ? void 0 : R(T[_], j, Z, P);
    }
    async function R(_, T = null, Z = ![], P = ![]) {
      const j = ge;
      let ee = 0;
      for (let ne = 0; ne < _[j(241)]; ne++) {
        const te = _[ne], se = a[j(226)](te, T);
        se.blendMode = Q[j(262)], se.stop(), se.reset(), se[j(267)] = !![], se.zeroSlopeAtStart = !![], !Z && (se[j(246)](Q.LoopOnce), se[j(215)]()), se.clampWhenFinished = P, se[j(260)](), te.duration > ee && (ee = te[j(256)]);
      }
      return new Promise((ne) => setTimeout(() => {
        ne();
      }, ee * 1e3));
    }
    function L(_) {
      const T = ge;
      _[T(245)] == null || !i[T(238)] || (z(T(223), _[T(269)]), n[T(257)] !== null && n.onHoverOverCallback(_));
    }
    function W(_) {
      const T = ge;
      _[T(245)] != null && n[T(261)] !== null && n[T(261)](_);
    }
    async function H(_) {
      const T = ge;
      n[T(233)] !== null && n[T(233)](_), i[T(242)](!![]), a[T(230)]();
      const Z = z(T(219), _[T(269)], ![], ![], f), P = z(T(259), _[T(269)], ![], ![]);
      await Promise[T(264)]([Z, P]);
      const j = c[T(220)]();
      z(T(258), j, !![]), G(_), i.setPaused(![]);
    }
    function G(_) {
      const T = ge;
      switch (u = _[T(255)][T(252)], d = _[T(255)].content, u) {
        case T(254):
          break;
        case T(221):
          i[T(251)](d);
          break;
        case T(212):
          i[T(214)](d);
          break;
        case T(247):
          r[T(217)](d, N), r[T(270)]();
          break;
        case T(244):
          r.openLink(d), N();
          break;
      }
      d = null, u = null;
    }
    n.changeSceneZoneByName = function(_, T = 0.01) {
      i[ge(214)](_, T);
    }, n.nextSceneZone = function() {
      i[ge(251)]();
    }, n[t(209)] = U, n.reset = N, n.onPointerDownCallback = null, n[t(257)] = null, n[t(261)] = null, n[t(208)] = null, n.onProgressLoading = null;
  }
}
export {
  wi as default
};
