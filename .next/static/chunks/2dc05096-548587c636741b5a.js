"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[864],{6014:function(t,e,i){i.d(e,{$p:function(){return RNN},Pl:function(){return LSTM},RJ:function(){return GRU},SM:function(){return GRUCell},U7:function(){return LSTMCell},_0:function(){return generateDropoutMask},_1:function(){return StackedRNNCells},ki:function(){return RNNCell},lx:function(){return standardizeArgs},nd:function(){return rnn},s9:function(){return SimpleRNN},xR:function(){return SimpleRNNCell}});var r=i(9680),s=i(8819),n=i(9840),l=i(8090),a=i(4079),u=i(163),o=i(588),h=i(2599),c=i(539),p=i(2931),g=i(6040),d=i(7538),C=i(1653),I=i(9897);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */function standardizeArgs(t,e,i,r){if(Array.isArray(t)){if(null!=e||null!=i)throw new o.nu("When inputs is an array, neither initialState or constants should be provided");null!=r&&(i=t.slice(t.length-r,t.length),t=t.slice(0,t.length-r)),t.length>1&&(e=t.slice(1,t.length)),t=t[0]}function toListOrNull(t){return null==t||Array.isArray(t)?t:[t]}return{inputs:t,initialState:e=toListOrNull(e),constants:i=toListOrNull(i)}}function rnn(t,e,i,s=!1,n,l,a=!1,u=!1){return r.lub(()=>{let h,c,p;let d=e.shape.length;if(d<3)throw new o.nu(`Input should be at least 3D, but is ${d}D.`);let C=[1,0].concat(g.w6(2,d));if(e=r.p4s(e,C),null!=l)throw new o.nj("The rnn() functoin of the deeplearn.js backend does not support constants yet.");a&&console.warn("Backend rnn(): the unroll = true option is not applicable to the imperative deeplearn.js backend."),null!=n&&((n=r.pju(r.pju(n,"bool"),"float32")).rank===d-1&&(n=r.dt4(n,-1)),n=r.p4s(n,C)),s&&(e=r.GYS(e,0),null!=n&&(n=r.GYS(n,0)));let I=[],R=i,S=e.shape[0],N=r.HHK(e);null!=n&&(c=r.HHK(n));for(let e=0;e<S;++e){let i=N[e],s=r.lub(()=>t(i,R));if(null==n)h=s[0],R=s[1];else{let t=r.lub(()=>{let t=c[e],i=r.luU(r.JpU(t),t),n=r.IHx(r.dC7(s[0],t),r.dC7(R[0],i)),l=R.map((e,n)=>r.IHx(r.dC7(s[1][n],t),r.dC7(e,i)));return{output:n,newStates:l}});h=t.output,R=t.newStates}u&&I.push(h)}return u&&(p=r.knu(I,1)),[h,p,R]})}let RNN=class RNN extends u.mh{constructor(t){let e;if(super(t),null==t.cell)throw new o.nu("cell property is missing for the constructor of RNN.");if(null==(e=Array.isArray(t.cell)?new StackedRNNCells({cells:t.cell}):t.cell).stateSize)throw new o.nu("The RNN cell should have an attribute `stateSize` (tuple of integers, one integer per RNN state).");this.cell=e,this.returnSequences=null!=t.returnSequences&&t.returnSequences,this.returnState=null!=t.returnState&&t.returnState,this.goBackwards=null!=t.goBackwards&&t.goBackwards,this._stateful=null!=t.stateful&&t.stateful,this.unroll=null!=t.unroll&&t.unroll,this.supportsMasking=!0,this.inputSpec=[new u.Zg({ndim:3})],this.stateSpec=null,this.states_=null,this.numConstants=null,this.keptStates=[]}getStates(){if(null!=this.states_)return this.states_;{let t=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1;return g.w6(0,t).map(t=>null)}}setStates(t){this.states_=t}computeOutputShape(t){let e;(0,d.XO)(t)&&(t=t[0]);let i=this.cell.stateSize;Array.isArray(i)||(i=[i]);let r=i[0];if(e=this.returnSequences?[t[0],t[1],r]:[t[0],r],!this.returnState)return e;{let r=[];for(let e of i)r.push([t[0],e]);return[e].concat(r)}}computeMask(t,e){return r.lub(()=>{Array.isArray(e)&&(e=e[0]);let t=this.returnSequences?e:null;if(!this.returnState)return t;{let e=this.states.map(t=>null);return[t].concat(e)}})}get states(){if(null!=this.states_)return this.states_;{let t=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1,e=[];for(let i=0;i<t;++i)e.push(null);return e}}set states(t){this.states_=t}build(t){let e;if(null!=this.numConstants)throw new o.nj("Constants support is not implemented in RNN yet.");(0,d.XO)(t)&&(t=t[0]);let i=this.stateful?t[0]:null,s=t.slice(2);this.inputSpec[0]=new u.Zg({shape:[i,null,...s]});let n=[t[0]].concat(t.slice(2));if(this.cell.build(n),e=Array.isArray(this.cell.stateSize)?this.cell.stateSize:[this.cell.stateSize],null!=this.stateSpec){if(!r.D5U.arraysEqual(this.stateSpec.map(t=>t.shape[t.shape.length-1]),e))throw new o.nu(`An initialState was passed that is not compatible with cell.stateSize. Received stateSpec=${this.stateSpec}; However cell.stateSize is ${this.cell.stateSize}`)}else this.stateSpec=e.map(t=>new u.Zg({shape:[null,t]}));this.stateful&&this.resetStates()}resetStates(t,e=!1){(0,r.lub)(()=>{if(!this.stateful)throw new o.j1("Cannot call resetStates() on an RNN Layer that is not stateful.");let i=this.inputSpec[0].shape[0];if(null==i)throw new o.nu("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if(null==this.states_)Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(t=>r.lls([i,t])):this.states_=[r.lls([i,this.cell.stateSize])];else if(null==t)r.B90(this.states_),null!=this.keptStates&&(r.B90(this.keptStates),this.keptStates=[]),Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(t=>r.lls([i,t])):this.states_[0]=r.lls([i,this.cell.stateSize]);else{if(Array.isArray(t)||(t=[t]),t.length!==this.states_.length)throw new o.nu(`Layer ${this.name} expects ${this.states_.length} state(s), but it received ${t.length} state value(s). Input received: ${t}`);!0===e?this.keptStates.push(this.states_.slice()):r.B90(this.states_);for(let e=0;e<this.states_.length;++e){let s=t[e],n=Array.isArray(this.cell.stateSize)?this.cell.stateSize[e]:this.cell.stateSize,l=[i,n];if(!r.D5U.arraysEqual(s.shape,l))throw new o.nu(`State ${e} is incompatible with layer ${this.name}: expected shape=${l}, received shape=${s.shape}`);this.states_[e]=s}}this.states_=this.states_.map(t=>r.CnY(t.clone()))})}apply(t,e){let i=null==e?null:e.initialState,r=null==e?null:e.constants;null==e&&(e={});let s=standardizeArgs(t,i,r,this.numConstants);t=s.inputs,i=s.initialState,r=s.constants;let n=[],l=[];if(null!=i){for(let t of(e.initialState=i,n=n.concat(i),this.stateSpec=[],i))this.stateSpec.push(new u.Zg({shape:t.shape}));l=l.concat(this.stateSpec)}null!=r&&(e.constants=r,n=n.concat(r),this.numConstants=r.length);let a=n[0]instanceof u.Iy;if(!a)return super.apply(t,e);{let i=[t].concat(n),r=this.inputSpec.concat(l),s=this.inputSpec;this.inputSpec=r;let a=super.apply(i,e);return this.inputSpec=s,a}}call(t,e){return(0,r.lub)(()=>{let i=null==e?null:e.mask,r=null==e?null:e.training,s=null==e?null:e.initialState;t=(0,d.nQ)(t),null==s&&(s=this.stateful?this.states_:this.getInitialState(t));let n=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1;if(s.length!==n)throw new o.nu(`RNN Layer has ${n} state(s) but was passed ${s.length} initial state(s).`);this.unroll&&console.warn("Ignoring unroll = true for RNN layer, due to imperative backend.");let l={training:r},a=rnn((t,e)=>{let i=this.cell.call([t].concat(e),l);return[i[0],i.slice(1)]},t,s,this.goBackwards,i,null,this.unroll,this.returnSequences),u=a[0],h=a[1],c=a[2];this.stateful&&this.resetStates(c,r);let p=this.returnSequences?h:u;return this.returnState?[p].concat(c):p})}getInitialState(t){return(0,r.lub)(()=>{let e=r.lls(t.shape);return(e=r.Smz(e,[1,2]),e=n.dt(e),Array.isArray(this.cell.stateSize))?this.cell.stateSize.map(t=>t>1?n.Gg(e,[1,t]):e):this.cell.stateSize>1?[n.Gg(e,[1,this.cell.stateSize])]:[e]})}get trainableWeights(){return this.trainable?this.cell.trainableWeights:[]}get nonTrainableWeights(){return this.trainable?this.cell.nonTrainableWeights:this.cell.weights}setFastWeightInitDuringBuild(t){super.setFastWeightInitDuringBuild(t),null!=this.cell&&this.cell.setFastWeightInitDuringBuild(t)}getConfig(){let t=super.getConfig(),e={returnSequences:this.returnSequences,returnState:this.returnState,goBackwards:this.goBackwards,stateful:this.stateful,unroll:this.unroll};null!=this.numConstants&&(e.numConstants=this.numConstants);let i=this.cell.getConfig();return this.getClassName()===RNN.className&&(e.cell={className:this.cell.getClassName(),config:i}),Object.assign(Object.assign(Object.assign({},i),t),e)}static fromConfig(t,e,i={}){let r=e.cell,s=(0,I.v)(r,i);return new t(Object.assign(e,{cell:s}))}};RNN.className="RNN",r.m7h.registerClass(RNN);let RNNCell=class RNNCell extends u.mh{};let SimpleRNNCell=class SimpleRNNCell extends RNNCell{constructor(t){super(t),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",this.units=t.units,(0,p.iQ)(this.units,"units"),this.activation=(0,s.aI)(null==t.activation?this.DEFAULT_ACTIVATION:t.activation),this.useBias=null==t.useBias||t.useBias,this.kernelInitializer=(0,h.L5)(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=(0,h.L5)(t.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=(0,h.L5)(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=(0,c.EC)(t.kernelRegularizer),this.recurrentRegularizer=(0,c.EC)(t.recurrentRegularizer),this.biasRegularizer=(0,c.EC)(t.biasRegularizer),this.kernelConstraint=(0,a.Ad)(t.kernelConstraint),this.recurrentConstraint=(0,a.Ad)(t.recurrentConstraint),this.biasConstraint=(0,a.Ad)(t.biasConstraint),this.dropout=g.VV([1,g.Fp([0,null==t.dropout?0:t.dropout])]),this.recurrentDropout=g.VV([1,g.Fp([0,null==t.recurrentDropout?0:t.recurrentDropout])]),this.dropoutFunc=t.dropoutFunc,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(t){t=(0,d.Wf)(t),this.kernel=this.addWeight("kernel",[t[t.length-1],this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,this.units],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias?this.bias=this.addWeight("bias",[this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(t,e){return(0,r.lub)(()=>{let i;if(2!==t.length)throw new o.nu(`SimpleRNNCell expects 2 input Tensors, got ${t.length}.`);let s=t[1];t=t[0];let l=null!=e.training&&e.training;0<this.dropout&&this.dropout<1&&null==this.dropoutMask&&(this.dropoutMask=generateDropoutMask({ones:()=>r.JpU(t),rate:this.dropout,training:l,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&null==this.recurrentDropoutMask&&(this.recurrentDropoutMask=generateDropoutMask({ones:()=>r.JpU(s),rate:this.recurrentDropout,training:l,dropoutFunc:this.dropoutFunc}));let a=this.dropoutMask,u=this.recurrentDropoutMask;i=null!=a?n.AK(r.dC7(t,a),this.kernel.read()):n.AK(t,this.kernel.read()),null!=this.bias&&(i=n.a2(i,this.bias.read())),null!=u&&(s=r.dC7(s,u));let h=r.IHx(i,n.AK(s,this.recurrentKernel.read()));return null!=this.activation&&(h=this.activation.apply(h)),[h,h]})}getConfig(){let t=super.getConfig(),e={units:this.units,activation:(0,s.GD)(this.activation),useBias:this.useBias,kernelInitializer:(0,h.Cx)(this.kernelInitializer),recurrentInitializer:(0,h.Cx)(this.recurrentInitializer),biasInitializer:(0,h.Cx)(this.biasInitializer),kernelRegularizer:(0,c.SG)(this.kernelRegularizer),recurrentRegularizer:(0,c.SG)(this.recurrentRegularizer),biasRegularizer:(0,c.SG)(this.biasRegularizer),activityRegularizer:(0,c.SG)(this.activityRegularizer),kernelConstraint:(0,a.xF)(this.kernelConstraint),recurrentConstraint:(0,a.xF)(this.recurrentConstraint),biasConstraint:(0,a.xF)(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout};return Object.assign(Object.assign({},t),e)}};SimpleRNNCell.className="SimpleRNNCell",r.m7h.registerClass(SimpleRNNCell);let SimpleRNN=class SimpleRNN extends RNN{constructor(t){t.cell=new SimpleRNNCell(t),super(t)}call(t,e){return(0,r.lub)(()=>{null!=this.cell.dropoutMask&&(r.B90(this.cell.dropoutMask),this.cell.dropoutMask=null),null!=this.cell.recurrentDropoutMask&&(r.B90(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let i=null==e?null:e.mask,s=null==e?null:e.training,n=null==e?null:e.initialState;return super.call(t,{mask:i,training:s,initialState:n})})}static fromConfig(t,e){return new t(e)}};SimpleRNN.className="SimpleRNN",r.m7h.registerClass(SimpleRNN);let GRUCell=class GRUCell extends RNNCell{constructor(t){if(super(t),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_RECURRENT_ACTIVATION="hardSigmoid",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",t.resetAfter)throw new o.nu("GRUCell does not support reset_after parameter set to true.");this.units=t.units,(0,p.iQ)(this.units,"units"),this.activation=(0,s.aI)(void 0===t.activation?this.DEFAULT_ACTIVATION:t.activation),this.recurrentActivation=(0,s.aI)(void 0===t.recurrentActivation?this.DEFAULT_RECURRENT_ACTIVATION:t.recurrentActivation),this.useBias=null==t.useBias||t.useBias,this.kernelInitializer=(0,h.L5)(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=(0,h.L5)(t.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=(0,h.L5)(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=(0,c.EC)(t.kernelRegularizer),this.recurrentRegularizer=(0,c.EC)(t.recurrentRegularizer),this.biasRegularizer=(0,c.EC)(t.biasRegularizer),this.kernelConstraint=(0,a.Ad)(t.kernelConstraint),this.recurrentConstraint=(0,a.Ad)(t.recurrentConstraint),this.biasConstraint=(0,a.Ad)(t.biasConstraint),this.dropout=g.VV([1,g.Fp([0,null==t.dropout?0:t.dropout])]),this.recurrentDropout=g.VV([1,g.Fp([0,null==t.recurrentDropout?0:t.recurrentDropout])]),this.dropoutFunc=t.dropoutFunc,this.implementation=t.implementation,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(t){t=(0,d.Wf)(t);let e=t[t.length-1];this.kernel=this.addWeight("kernel",[e,3*this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,3*this.units],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias?this.bias=this.addWeight("bias",[3*this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(t,e){return(0,r.lub)(()=>{let i,s,l;if(2!==t.length)throw new o.nu(`GRUCell expects 2 input Tensors (inputs, h, c), got ${t.length}.`);let a=null!=e.training&&e.training,u=t[1];t=t[0],0<this.dropout&&this.dropout<1&&null==this.dropoutMask&&(this.dropoutMask=generateDropoutMask({ones:()=>r.JpU(t),rate:this.dropout,training:a,count:3,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&null==this.recurrentDropoutMask&&(this.recurrentDropoutMask=generateDropoutMask({ones:()=>r.JpU(u),rate:this.recurrentDropout,training:a,count:3,dropoutFunc:this.dropoutFunc}));let h=this.dropoutMask,c=this.recurrentDropoutMask;0<this.dropout&&this.dropout<1&&(t=r.dC7(t,h[0]));let p=n.AK(t,this.kernel.read());this.useBias&&(p=n.a2(p,this.bias.read())),0<this.recurrentDropout&&this.recurrentDropout<1&&(u=r.dC7(u,c[0]));let g=this.recurrentKernel.read(),[d,C]=r.Vl2(g,[2*this.units,this.units],g.rank-1),I=n.AK(u,d),[R,S,N]=r.Vl2(p,3,p.rank-1),[k,z]=r.Vl2(I,2,I.rank-1);i=this.recurrentActivation.apply(r.IHx(R,k)),s=this.recurrentActivation.apply(r.IHx(S,z));let A=n.AK(r.dC7(s,u),C);l=this.activation.apply(r.IHx(N,A));let f=r.IHx(r.dC7(i,u),r.dC7(r.IHx(1,r.W76(i)),l));return[f,f]})}getConfig(){let t=super.getConfig(),e={units:this.units,activation:(0,s.GD)(this.activation),recurrentActivation:(0,s.GD)(this.recurrentActivation),useBias:this.useBias,kernelInitializer:(0,h.Cx)(this.kernelInitializer),recurrentInitializer:(0,h.Cx)(this.recurrentInitializer),biasInitializer:(0,h.Cx)(this.biasInitializer),kernelRegularizer:(0,c.SG)(this.kernelRegularizer),recurrentRegularizer:(0,c.SG)(this.recurrentRegularizer),biasRegularizer:(0,c.SG)(this.biasRegularizer),activityRegularizer:(0,c.SG)(this.activityRegularizer),kernelConstraint:(0,a.xF)(this.kernelConstraint),recurrentConstraint:(0,a.xF)(this.recurrentConstraint),biasConstraint:(0,a.xF)(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation,resetAfter:!1};return Object.assign(Object.assign({},t),e)}};GRUCell.className="GRUCell",r.m7h.registerClass(GRUCell);let GRU=class GRU extends RNN{constructor(t){0===t.implementation&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),t.cell=new GRUCell(t),super(t)}call(t,e){return(0,r.lub)(()=>{null!=this.cell.dropoutMask&&(r.B90(this.cell.dropoutMask),this.cell.dropoutMask=null),null!=this.cell.recurrentDropoutMask&&(r.B90(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let i=null==e?null:e.mask,s=null==e?null:e.training,n=null==e?null:e.initialState;return super.call(t,{mask:i,training:s,initialState:n})})}static fromConfig(t,e){return 0===e.implmentation&&(e.implementation=1),new t(e)}};GRU.className="GRU",r.m7h.registerClass(GRU);let LSTMCell=class LSTMCell extends RNNCell{constructor(t){super(t),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_RECURRENT_ACTIVATION="hardSigmoid",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",this.units=t.units,(0,p.iQ)(this.units,"units"),this.activation=(0,s.aI)(void 0===t.activation?this.DEFAULT_ACTIVATION:t.activation),this.recurrentActivation=(0,s.aI)(void 0===t.recurrentActivation?this.DEFAULT_RECURRENT_ACTIVATION:t.recurrentActivation),this.useBias=null==t.useBias||t.useBias,this.kernelInitializer=(0,h.L5)(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=(0,h.L5)(t.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=(0,h.L5)(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.unitForgetBias=t.unitForgetBias,this.kernelRegularizer=(0,c.EC)(t.kernelRegularizer),this.recurrentRegularizer=(0,c.EC)(t.recurrentRegularizer),this.biasRegularizer=(0,c.EC)(t.biasRegularizer),this.kernelConstraint=(0,a.Ad)(t.kernelConstraint),this.recurrentConstraint=(0,a.Ad)(t.recurrentConstraint),this.biasConstraint=(0,a.Ad)(t.biasConstraint),this.dropout=g.VV([1,g.Fp([0,null==t.dropout?0:t.dropout])]),this.recurrentDropout=g.VV([1,g.Fp([0,null==t.recurrentDropout?0:t.recurrentDropout])]),this.dropoutFunc=t.dropoutFunc,this.implementation=t.implementation,this.stateSize=[this.units,this.units],this.dropoutMask=null,this.recurrentDropoutMask=null}build(t){var e;let i;t=(0,d.Wf)(t);let r=t[t.length-1];if(this.kernel=this.addWeight("kernel",[r,4*this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,4*this.units],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias){if(this.unitForgetBias){let t=this.biasInitializer,r=this.units;i=new((e=class extends h.m7{apply(e,i){let s=t.apply([r]),l=new h.M6().apply([r]),a=t.apply([2*r]);return n.GZ(n.GZ(s,l),a)}}).className="CustomInit",e)}else i=this.biasInitializer;this.bias=this.addWeight("bias",[4*this.units],null,i,this.biasRegularizer,!0,this.biasConstraint)}else this.bias=null;this.built=!0}call(t,e){return(0,r.lub)(()=>{let i,s,l,a;let u=null!=e.training&&e.training;if(3!==t.length)throw new o.nu(`LSTMCell expects 3 input Tensors (inputs, h, c), got ${t.length}.`);let h=t[1],c=t[2];t=t[0],0<this.dropout&&this.dropout<1&&null==this.dropoutMask&&(this.dropoutMask=generateDropoutMask({ones:()=>r.JpU(t),rate:this.dropout,training:u,count:4,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&null==this.recurrentDropoutMask&&(this.recurrentDropoutMask=generateDropoutMask({ones:()=>r.JpU(h),rate:this.recurrentDropout,training:u,count:4,dropoutFunc:this.dropoutFunc}));let p=this.dropoutMask,g=this.recurrentDropoutMask;0<this.dropout&&this.dropout<1&&(t=r.dC7(t,p[0]));let d=n.AK(t,this.kernel.read());0<this.recurrentDropout&&this.recurrentDropout<1&&(h=r.dC7(h,g[0])),d=r.IHx(d,n.AK(h,this.recurrentKernel.read())),this.useBias&&(d=n.a2(d,this.bias.read()));let[C,I,R,S]=r.Vl2(d,4,d.rank-1);i=this.recurrentActivation.apply(C),s=this.recurrentActivation.apply(I),l=r.IHx(r.dC7(s,c),r.dC7(i,this.activation.apply(R))),a=this.recurrentActivation.apply(S);let N=r.dC7(a,this.activation.apply(l));return[N,N,l]})}getConfig(){let t=super.getConfig(),e={units:this.units,activation:(0,s.GD)(this.activation),recurrentActivation:(0,s.GD)(this.recurrentActivation),useBias:this.useBias,kernelInitializer:(0,h.Cx)(this.kernelInitializer),recurrentInitializer:(0,h.Cx)(this.recurrentInitializer),biasInitializer:(0,h.Cx)(this.biasInitializer),unitForgetBias:this.unitForgetBias,kernelRegularizer:(0,c.SG)(this.kernelRegularizer),recurrentRegularizer:(0,c.SG)(this.recurrentRegularizer),biasRegularizer:(0,c.SG)(this.biasRegularizer),activityRegularizer:(0,c.SG)(this.activityRegularizer),kernelConstraint:(0,a.xF)(this.kernelConstraint),recurrentConstraint:(0,a.xF)(this.recurrentConstraint),biasConstraint:(0,a.xF)(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation};return Object.assign(Object.assign({},t),e)}};LSTMCell.className="LSTMCell",r.m7h.registerClass(LSTMCell);let LSTM=class LSTM extends RNN{constructor(t){0===t.implementation&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),t.cell=new LSTMCell(t),super(t)}call(t,e){return(0,r.lub)(()=>{null!=this.cell.dropoutMask&&(r.B90(this.cell.dropoutMask),this.cell.dropoutMask=null),null!=this.cell.recurrentDropoutMask&&(r.B90(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let i=null==e?null:e.mask,s=null==e?null:e.training,n=null==e?null:e.initialState;return super.call(t,{mask:i,training:s,initialState:n})})}static fromConfig(t,e){return 0===e.implmentation&&(e.implementation=1),new t(e)}};LSTM.className="LSTM",r.m7h.registerClass(LSTM);let StackedRNNCells=class StackedRNNCells extends RNNCell{constructor(t){super(t),this.cells=t.cells}get stateSize(){let t=[];for(let e of this.cells.slice().reverse())Array.isArray(e.stateSize)?t.push(...e.stateSize):t.push(e.stateSize);return t}call(t,e){return(0,r.lub)(()=>{let i;let r=t.slice(1),s=[];for(let t of this.cells.slice().reverse())Array.isArray(t.stateSize)?s.push(r.splice(0,t.stateSize.length)):s.push(r.splice(0,1));s.reverse();let n=[];for(let l=0;l<this.cells.length;++l){let a=this.cells[l];r=s[l],i=0===l?[t[0]].concat(r):[i[0]].concat(r),i=a.call(i,e),n.push(i.slice(1))}for(let t of(r=[],n.slice().reverse()))r.push(...t);return[i[0]].concat(r)})}build(t){let e;(0,d.XO)(t)&&(t=t[0]),this.cells.forEach((i,r)=>{(0,l.f4)(`RNNCell_${r}`,()=>{i.build(t),e=Array.isArray(i.stateSize)?i.stateSize[0]:i.stateSize,t=[t[0],e]})}),this.built=!0}getConfig(){let t=super.getConfig(),e=this.cells.map(t=>({className:t.getClassName(),config:t.getConfig()}));return Object.assign(Object.assign({},t),{cells:e})}static fromConfig(t,e,i={}){let r=[];for(let t of e.cells)r.push((0,I.v)(t,i));return new t({cells:r})}get trainableWeights(){if(!this.trainable)return[];let t=[];for(let e of this.cells)t.push(...e.trainableWeights);return t}get nonTrainableWeights(){let t=[];for(let e of this.cells)t.push(...e.nonTrainableWeights);if(!this.trainable){let e=[];for(let t of this.cells)e.push(...t.trainableWeights);return e.concat(t)}return t}getWeights(){let t=[];for(let e of this.cells)t.push(...e.weights);return(0,C.FQ)(t)}setWeights(t){let e=[];for(let i of this.cells){let r=i.weights.length,s=t.splice(r);for(let t=0;t<i.weights.length;++t)e.push([i.weights[t],s[t]])}(0,C.zb)(e)}};function generateDropoutMask(t){let{ones:e,rate:i,training:s=!1,count:l=1,dropoutFunc:a}=t,droppedInputs=()=>null!=a?a(e(),i):n.rv(e(),i),createMask=()=>n.KC(droppedInputs,e,s);if(!l||l<=1)return r.CnY(createMask().clone());let u=Array(l).fill(void 0).map(createMask);return u.map(t=>r.CnY(t.clone()))}StackedRNNCells.className="StackedRNNCells",r.m7h.registerClass(StackedRNNCells)}}]);