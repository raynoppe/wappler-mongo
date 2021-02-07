dmx.Attribute('bs-tooltip', 'mounted', function(node, attr) {
  this.$addBinding(attr.value, function(value) {
    node.setAttribute('tooltip-title', value || '');
  })
});

$(function () {
  $('body').tooltip({
    selector: '[tooltip-title]',
    trigger: 'hover',
    title: function() {
      var expression = this.getAttribute('dmx-bs-tooltip') || '';
      return dmx.parse(expression) || this.getAttribute('tooltip-title') || '';
    }
  });
});
