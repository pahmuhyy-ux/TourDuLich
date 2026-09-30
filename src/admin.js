const tours=[{id:1,code:'TO-1023',name:'Hạ Long 3N2Đ',type:'Biển đảo',date:'2026-10-12',price:4490000,status:'open'},{id:2,code:'TO-1129',name:'Đà Nẵng - Hội An',type:'Miền Trung',date:'2026-10-18',price:5890000,status:'pending'},{id:3,code:'TO-1155',name:'Phú Quốc 4N3Đ',type:'Biển đảo',date:'2026-11-02',price:6790000,status:'open'},{id:4,code:'TO-1194',name:'Sapa - Fansipan',type:'Núi rừng',date:'2026-11-15',price:5290000,status:'closed'},{id:5,code:'TO-1218',name:'Ninh Bình - Tràng An',type:'Miền Bắc',date:'2026-10-26',price:3890000,status:'open'},{id:6,code:'TO-1282',name:'Cần Thơ - Châu Đốc',type:'Miền Nam',date:'2026-12-03',price:4590000,status:'pending'}];
const statusLabel={open:'Đang mở',pending:'Chờ duyệt',closed:'Đã đóng'};
const $=id=>document.getElementById(id), tbody=$('tourTableBody'), searchInput=$('searchInput'), statusFilter=$('statusFilter'), modal=$('tourModal'), modalTitle=$('modalTitle'), addTourBtn=$('addTourBtn'), closeModalBtn=$('closeModalBtn'), cancelModalBtn=$('cancelModalBtn'), saveTourBtn=$('saveTourBtn');
const confirmModal=$('confirmDeleteModal'), confirmDeleteText=$('confirmDeleteText'), cancelDeleteBtn=$('cancelDeleteBtn'), confirmDeleteBtn=$('confirmDeleteBtn');
let editingId=null, pendingDeleteId=null;

const formatCurrency=v=>new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND',maximumFractionDigits:0}).format(v);
const renderStats=()=>{ $('totalTours').textContent=tours.length; $('activeTours').textContent=tours.filter(t=>t.status==='open').length; $('pendingTours').textContent=tours.filter(t=>t.status==='pending').length; };
const renderRows=()=>{
  const keyword=searchInput.value.trim().toLowerCase(), filter=statusFilter.value;
  const filtered=tours.filter(t=>(!keyword||[t.name,t.code,t.type].some(v=>v.toLowerCase().includes(keyword)))&&(filter==='all'||t.status===filter));
  tbody.innerHTML=filtered.length?filtered.map(t=>`<tr><td><div class="tour-info"><div class="tour-thumb">✈️</div><div><p class="tour-name">${t.name}</p><span class="tour-meta">${t.type}</span></div></div></td><td><span class="code">${t.code}</span></td><td>${t.type}</td><td>${new Date(t.date).toLocaleDateString('vi-VN')}</td><td class="price">${formatCurrency(t.price)}</td><td><span class="badge ${t.status}">${statusLabel[t.status]}</span></td><td><div class="table-actions"><button class="icon-btn edit" data-action="edit" data-id="${t.id}">Sửa</button><button class="icon-btn delete" data-action="delete" data-id="${t.id}">Xóa</button></div></td></tr>`).join():'<tr><td colspan="7" class="empty-state">Không tìm thấy tour phù hợp.</td></tr>';
};
const openModal=(mode='create',tour=null)=>{ modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
  if(mode==='create'){ editingId=null; modalTitle.textContent='Thêm tour mới'; $('tourName').value=''; $('tourCode').value=''; $('tourType').value='Miền Bắc'; $('tourDate').value=''; $('tourPrice').value=''; $('tourStatus').value='open'; return; }
  editingId=tour.id; modalTitle.textContent='Chỉnh sửa tour'; $('tourName').value=tour.name; $('tourCode').value=tour.code; $('tourType').value=tour.type; $('tourDate').value=tour.date; $('tourPrice').value=tour.price; $('tourStatus').value=tour.status;
};
const closeModal=()=>{ modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); };
const openDeleteConfirm=(id)=>{
  const tour=tours.find(t=>t.id===id);
  if(!tour) return;
  pendingDeleteId=id;
  confirmDeleteText.textContent=`Bạn có chắc chắn muốn xóa tour "${tour.name}" (${tour.code}) không? Hành động này không thể hoàn tác.`;
  confirmModal.classList.add('show');
  confirmModal.setAttribute('aria-hidden','false');
};
const closeDeleteConfirm=()=>{
  pendingDeleteId=null;
  confirmModal.classList.remove('show');
  confirmModal.setAttribute('aria-hidden','true');
};
const confirmDeleteTour=()=>{
  if(pendingDeleteId===null) return;
  const i=tours.findIndex(t=>t.id===pendingDeleteId);
  if(i!==-1){ tours.splice(i,1); }
  closeDeleteConfirm();
  renderStats();
  renderRows();
};
const saveTour=()=>{
  const name=$('tourName').value.trim(), code=$('tourCode').value.trim(), type=$('tourType').value, date=$('tourDate').value, price=Number($('tourPrice').value), status=$('tourStatus').value;
  if(!name||!code||!date||!price){ alert('Vui lòng nhập đầy đủ thông tin tour.'); return; }
  if(editingId!==null){ const i=tours.findIndex(t=>t.id===editingId); if(i!==-1) tours[i]={...tours[i],name,code,type,date,price,status}; }
  else tours.unshift({id:Date.now(),name,code,type,date,price,status});
  renderStats(); renderRows(); closeModal();
};
tbody.addEventListener('click',e=>{ const btn=e.target.closest('button'); if(!btn)return; const id=Number(btn.dataset.id), action=btn.dataset.action;
  if(action==='delete'){ openDeleteConfirm(id); return; }
  if(action==='edit'){ const tour=tours.find(t=>t.id===id); if(tour) openModal('edit',tour); }
});
searchInput.addEventListener('input',renderRows); statusFilter.addEventListener('change',renderRows); addTourBtn.addEventListener('click',()=>openModal('create')); closeModalBtn.addEventListener('click',closeModal); cancelModalBtn.addEventListener('click',closeModal); saveTourBtn.addEventListener('click',saveTour); cancelDeleteBtn.addEventListener('click',closeDeleteConfirm); confirmDeleteBtn.addEventListener('click',confirmDeleteTour); modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); }); confirmModal.addEventListener('click',e=>{ if(e.target===confirmModal) closeDeleteConfirm(); });
renderStats(); renderRows();
