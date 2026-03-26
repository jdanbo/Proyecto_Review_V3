class InmuebleCard extends HTMLElement {
  connectedCallback() {
    const id    = this.getAttribute('data-id');
    const tipo  = this.getAttribute('data-tipo')  || '';
    const dir   = this.getAttribute('data-dir')   || '';
    const valor = this.getAttribute('data-valor') || '0';
    const img   = this.getAttribute('data-img')   || '';
 
    this.innerHTML = `
      <div class="row-item">
        <div class="row-img">
          ${img ? `<img src="${img}" alt="">` : '<div class="no-img"></div>'}
        </div>
        <div class="row-tipo">${tipo}</div>
        <div class="row-dir">${dir}</div>
        <div class="row-valor">$${Number(valor).toLocaleString('es-CO')}</div>
        <div class="row-actions">
          <a href="inmueble.html?id=${id}">Ver</a>
          <a href="#" class="link-eliminar" onclick="confirmarEliminar(${id}); return false;">Eliminar</a>
        </div>
      </div>
    `;
  }
}
customElements.define('inmueble-card', InmuebleCard);