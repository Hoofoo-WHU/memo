interface Actions {
  [x: string]: Function
}

interface Templates {
  [x: string]: (...list: any[]) => JQuery
}

export class Model {
  data: Object
  constructor({ data, actions }: { data: Object, actions?: Actions }) {
    this.data = data
    Object.assign(this, actions)
  }
}

export class Controller {
  model: Model
  constructor({ model, actions }: { model: Model, actions?: Actions }) {
    this.model = model
    Object.assign(this, actions)
  }
}

interface ViewParams {
  controller: Controller
  el: JQuery
  templates?: Templates
  renders?: Actions
  bindEvent?: Function
  actions?: Actions
  beforeCreate?: Function
  created?: Function
}
export class View {
  controller: Controller
  el: JQuery
  templates?: Templates
  renders?: Actions
  constructor({ controller, el, templates, renders, bindEvent, actions, beforeCreate, created }: ViewParams) {
    beforeCreate && beforeCreate()
    this.controller = controller
    this.el = el
    for (let render in renders) {
      renders[render] = renders[render].bind(this)
    }
    this.renders = renders
    this.templates = templates
    bindEvent && bindEvent()
    Object.assign(this, actions)
    created && created()
  }
}
