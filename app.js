const DATA_KEY    = 'acme_inmuebles';
const DATA_VERSION = 'v2';

// --- DATOS DE EJEMPLO ---
function defaultData() {
  return [
    { id: 1, direccion: '4a Calle 12-45 Zona 10', tipo: 'Apartamento', ciudad: 'Guatemala', departamento: 'Guatemala', matricula: 'GT-010-00123', area: '95', propietario: 'Carlos Estrada', identificacion: '1234567-8', valor: 850000,  uso_comercial: false, img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe8%2Faa%2Fa2%2Fe8aaa218f1a475e95ca09ac8def2e83e.jpg&f=1&nofb=1&ipt=9f43e3153f0334369d7de375cb14656fe3d2d146321b9efae1510d97345756ce' },
    { id: 2, direccion: '15 Avenida 5-30 Zona 15', tipo: 'Casa', ciudad: 'Guatemala', departamento: 'Guatemala', matricula: 'GT-010-00456', area: '210',  propietario: 'Ana Morales', identificacion: '2345678-9', valor: 1250000, uso_comercial: false, img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tudoconstrucao.com%2Fwp-content%2Fuploads%2F2015%2F06%2FCasa-moderna-9.jpg&f=1&nofb=1&ipt=1ba8f8303593f71f79af7092b36042480e336974217cbc1ddade97e49d23ed7a' },
    { id: 3, direccion: 'Calle del Arco 3-18', tipo: 'Casa', ciudad: 'Antigua Guatemala', departamento: 'Sacatepéquez', matricula: 'GT-003-00789', area: '320', propietario: 'Roberto Cifuentes', identificacion: '3456789-0', valor: 2100000, uso_comercial: false, img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdecoraideas.com%2Fwp-content%2Fuploads%2F2019%2F08%2F05-2.jpg&f=1&nofb=1&ipt=0f161c6e09e276bcbc1fd1f9e53c623fac581b2aecf2792ed160019cc53eb86a' },
    { id: 4, direccion: '6a Calle 9-22 Zona 1', tipo: 'Local', ciudad: 'Quetzaltenango', departamento: 'Quetzaltenango', matricula: 'GT-009-01122', area: '75', propietario: 'María López', identificacion: '4567890-1', valor: 420000,  uso_comercial: true,  img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fprivatelog.com.br%2Fwp-content%2Fuploads%2F2025%2F04%2Ffundos-imobiliarios-de-galpoes-capa.jpg-.jpg&f=1&nofb=1&ipt=b2c2d5e3f12c881add9fe8a05ed99ab0e704874638a18e3ee122f9422ade4947' },
    { id: 5, direccion: 'Blvd. Los Próceres 22-10 Z.10', tipo: 'Oficina', ciudad: 'Guatemala', departamento: 'Guatemala', matricula: 'GT-010-01345', area: '120', propietario: 'José Ramírez', identificacion: '5678901-2', valor: 680000,  uso_comercial: true,  img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.toroinvestimentos.com.br%2Fwp-content%2Fuploads%2Ftipos-de-fiis-1024x683.jpg&f=1&nofb=1&ipt=2abad74e866be8ec1bd1dea05812f32fc625a751a81f6d76c2de4d1b4d8e17e3' },
    { id: 6, direccion: 'Km 14.5 Carretera a El Salvador', tipo: 'Terreno', ciudad: 'Villa Nueva', departamento: 'Guatemala', matricula: 'GT-010-01678', area: '1500', propietario: 'Luisa Pérez', identificacion: '6789012-3', valor: 950000,  uso_comercial: false, img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.maisretorno.com%2Fportal%2Fwp-content%2Fuploads%2F2021%2F04%2Ffundos-imobiliarios-em-2018.jpg&f=1&nofb=1&ipt=366bbf1e32fd03b0e0f26024aaf252f5ea3bb4aef5a2ef6df3245f24408bc8f5' },
    { id: 7, direccion: '3a Calle 6-40 Zona 2', tipo: 'Apartamento', ciudad: 'Cobán', departamento: 'Alta Verapaz', matricula: 'GT-016-01901', area: '80', propietario: 'Diego Castellanos', identificacion: '7890123-4', valor: 390000,  uso_comercial: false, img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbaseincorporacoes.com.br%2Fwp-content%2Fuploads%2F2025%2F06%2Fempreendimentos-imobiliarios.png&f=1&nofb=1&ipt=7107588b3e22df5a47cf853406f42355c55fada14e4226f4595bfdda5e81fd32' },
  ];
}

function load() {
  try {
    // Si la versión guardada es distinta, reiniciar con defaults
    if (localStorage.getItem(DATA_KEY + '_ver') !== DATA_VERSION) {
      const fresh = defaultData();
      localStorage.setItem(DATA_KEY, JSON.stringify(fresh));
      localStorage.setItem(DATA_KEY + '_ver', DATA_VERSION);
      return fresh;
    }
    const d = localStorage.getItem(DATA_KEY);
    return d ? JSON.parse(d) : defaultData();
  } catch {
    return defaultData();
  }
}

function save(list) {
  localStorage.setItem(DATA_KEY, JSON.stringify(list));
}

function getById(id) {
  return load().find(i => i.id === Number(id));
}

// --- TOAST ---
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => t.className = 'toast', 2500);
}

// --- MODAL CONFIRMAR ELIMINAR ---
let _pendingDeleteId = null;

function confirmarEliminar(id) {
  _pendingDeleteId = id;
  document.getElementById('modal').classList.add('show');
}

function cerrarModal() {
  _pendingDeleteId = null;
  document.getElementById('modal').classList.remove('show');
}

function ejecutarEliminar() {
  if (!_pendingDeleteId) return;
  const list = load().filter(i => i.id !== Number(_pendingDeleteId));
  save(list);
  cerrarModal();
  showToast('Inmueble eliminado.');
  setTimeout(() => location.reload(), 800);
}

// DASHBOARD
function initDashboard() {
  const container = document.getElementById('rows');
  if (!container) return;

  const PER_PAGE = 5;
  let page = 1;
  let query = '';

  function filtered() {
    const all = load();
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter(i =>
      i.direccion.toLowerCase().includes(q) ||
      i.tipo.toLowerCase().includes(q) ||
      i.ciudad.toLowerCase().includes(q)
    );
  }

  function render() {
    const list  = filtered();
    const total = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (page > total) page = total;
    const items = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    if (items.length === 0) {
      container.innerHTML = '<div class="empty">No se encontraron inmuebles.</div>';
    } else {
      container.innerHTML = items.map(function(i) {
        var imgHtml = i.img ? '<img src="' + i.img + '" alt="">' : '<div class="no-img"></div>';
        var valor   = 'Q' + Number(i.valor).toLocaleString('es-GT');
        return '<div class="row-item">'
          + '<div class="row-img">' + imgHtml + '</div>'
          + '<div class="row-tipo">' + i.tipo + '</div>'
          + '<div class="row-dir">'  + i.direccion + '</div>'
          + '<div class="row-valor">' + valor + '</div>'
          + '<div class="row-actions">'
          + '<a href="inmueble.html?id=' + i.id + '">Ver</a>'
          + '<a href="#" class="link-eliminar" onclick="confirmarEliminar(' + i.id + '); return false;">Eliminar</a>'
          + '</div></div>';
      }).join('');
    }

    // Paginación
    const pag = document.getElementById('pagination');
    pag.innerHTML = '';

    const prev = document.createElement('button');
    prev.textContent = '◄';
    prev.disabled = page === 1;
    prev.onclick = () => { page--; render(); };
    pag.appendChild(prev);

    for (let p = 1; p <= total; p++) {
      const btn = document.createElement('button');
      btn.textContent = p;
      if (p === page) btn.classList.add('active');
      btn.onclick = () => { page = p; render(); };
      pag.appendChild(btn);
    }

    const next = document.createElement('button');
    next.textContent = '►';
    next.disabled = page === total;
    next.onclick = () => { page++; render(); };
    pag.appendChild(next);
  }

  document.getElementById('search-input').addEventListener('input', function() {
    query = this.value;
    page = 1;
    render();
  });

  document.getElementById('btn-search').addEventListener('click', function() {
    query = document.getElementById('search-input').value;
    page = 1;
    render();
  });

  render();
}

// FORM
function initForm() {
  const form = document.getElementById('form-inmueble');
  if (!form) return;

  const params   = new URLSearchParams(window.location.search);
  const id       = params.get('id');
  const readonly = params.get('mode') === 'ver';

  if (id) {
    const d = getById(id);
    if (d) {
      document.getElementById('f-direccion').value      = d.direccion;
      document.getElementById('f-tipo').value           = d.tipo;
      document.getElementById('f-ciudad').value         = d.ciudad;
      document.getElementById('f-departamento').value   = d.departamento;
      document.getElementById('f-matricula').value      = d.matricula;
      document.getElementById('f-area').value           = d.area;
      document.getElementById('f-propietario').value    = d.propietario;
      document.getElementById('f-identificacion').value = d.identificacion;
      document.getElementById('f-valor').value          = d.valor;
      document.getElementById('f-uso').checked          = d.uso_comercial;
      document.getElementById('f-img').value            = d.img || '';

      const imgEl = document.getElementById('form-img-preview');
      if (d.img) imgEl.innerHTML = `<img src="${d.img}" alt="">`;

      if (readonly) {
        document.getElementById('form-title').textContent = 'Ver Inmueble';
        // Bloquear todos los campos
        form.querySelectorAll('input, select').forEach(el => {
          if (el.type === 'checkbox') el.disabled = true;
          else el.setAttribute('readonly', true);
        });
        document.querySelector('.form-footer').style.display = 'none';
      }
    }
  }

  // Preview imagen modo edición
  if (!readonly) {
    document.getElementById('f-img').addEventListener('input', function() {
      const imgEl = document.getElementById('form-img-preview');
      imgEl.innerHTML = this.value ? `<img src="${this.value}" alt="">` : '';
    });
  }

  // Guardar
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const list = load();
    const data = {
      id:           id ? Number(id) : Math.max(0, ...list.map(i => i.id)) + 1,
      direccion:    document.getElementById('f-direccion').value.trim(),
      tipo:         document.getElementById('f-tipo').value,
      ciudad:       document.getElementById('f-ciudad').value.trim(),
      departamento: document.getElementById('f-departamento').value.trim(),
      matricula:    document.getElementById('f-matricula').value.trim(),
      area:         document.getElementById('f-area').value.trim(),
      propietario:  document.getElementById('f-propietario').value.trim(),
      identificacion: document.getElementById('f-identificacion').value.trim(),
      valor:        Number(document.getElementById('f-valor').value),
      uso_comercial: document.getElementById('f-uso').checked,
      img:          document.getElementById('f-img').value.trim(),
    };

    if (!data.direccion) { showToast('La dirección es requerida.', true); return; }

    if (id) {
      const idx = list.findIndex(i => i.id === Number(id));
      list[idx] = data;
    } else {
      list.push(data);
    }
    save(list);
    showToast('Inmueble guardado.');
    setTimeout(() => window.location.href = 'dashboard.html', 800);
  });
}

// --- AUTO INIT ---
document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initForm();
});