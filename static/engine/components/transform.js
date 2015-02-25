TransformComponent = function(options) {
	options = options || {};

	this.sub = null;

	this._scale = options.scale || new Vector3(1, 1, 1);
	this._position = options.position || new Vector3(0, 0, 0);
	this._rotation = options.rotation || new Quaternion(0, 0, 0, 1);
}

TransformComponent.prototype.applyTransform = function() {
	this.setPosition(this._position);
	this.setRotation(this._rotation);
	this.setScale(this._scale);
}

TransformComponent.prototype.subscribe = function(comp) {
	if (!comp.getPosition || !comp.setPosition || 
		!comp.getRotation || !comp.setRotation || 
		!comp.getScale || !comp.setScale)
		return false;

	this.sub = comp;
	this.applyTransform();
}

TransformComponent.prototype.getPosition = function() {
	if (this.sub)
		return this.sub.getPosition();
	else
		return this._position;
}

TransformComponent.prototype.setPosition = function(p) {
	if (this.sub)
		this.sub.setPosition(p);
	else
		this._position.copy(p);
}

TransformComponent.prototype.getRotation = function() {
	if (this.sub)
		return this.sub.getRotation();
	else
		return this._rotation;
}

TransformComponent.prototype.setRotation = function(q) {
	if (this.sub)
		this.sub.setRotation(q);
	else
		this._rotation.copy(q);
}

TransformComponent.prototype.getScale = function() {
	if (this.sub)
		return this.sub.getScale();
	else
		return this._scale;
}

TransformComponent.prototype.setScale = function(v) {
	if (this.sub)
		this.sub.setScale(v)
	else
		this._scale.copy(v);
}

Components.register('transform', TransformComponent);
