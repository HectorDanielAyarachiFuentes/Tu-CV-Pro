document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. STATE MANAGEMENT ---
    let cvData = {
        layout: 'classic',
        themeColor: '#dc3545',
        avatar: { type: 'initials', value: 'HD' },
        personalInfo: { 
            firstName: 'Hector Daniel', 
            lastName: 'Ayarachi Fuentes', 
            title: 'Desarrollador de Software', 
            email: 'mp4o@hotmail.com', 
            phone: '2995056213', 
            address: 'Neuquen, Argentina', 
            website: 'linkedin.com/in/hector-daniel-ayarachi-fuentes/', 
            summary: 'Soy un desarrollador de software con una sólida experiencia en la creación de aplicaciones web escalables y eficientes. Mi enfoque principal se centra en el desarrollo backend, donde tengo un profundo conocimiento de Python y el ecosistema de AWS. Además, he trabajado en proyectos de DevOps para mejorar la eficiencia y la automatización de los procesos de desarrollo.' 
        },
        experience: [{ id: Date.now() + 1, position: 'Desarrollador Backend Senior', company: 'Tech Solutions Inc.', startDate: '2020-02', endDate: '', current: true, description: '- Lideré el desarrollo del microservicio de pagos.\n- Optimicé consultas a la base de datos, mejorando el rendimiento en un 40%.\n- Implementé pipelines de CI/CD con Jenkins y Docker.' }],
        education: [{ id: Date.now() + 2, degree: 'Ingeniería en Sistemas de Información', institution: 'Universidad Tecnológica Nacional', startDate: '2014-04', endDate: '2020-01', current: false, description: 'Proyecto final sobre optimización de redes neuronales.' }],
        skills: [{ id: Date.now() + 3, name: 'Python', level: 'expert' }, { id: Date.now() + 4, name: 'AWS', level: 'advanced' }, { id: Date.now() + 5, name: 'Docker', level: 'advanced' }, { id: Date.now() + 6, name: 'JavaScript', level: 'intermediate' }],
        footer: [
            { id: Date.now() + 7, type: 'email', label: '', value: 'mp4o@hotmail.com'},
            { id: Date.now() + 8, type: 'linkedin', label: 'LinkedIn', value: 'in/hector-daniel-ayarachi-fuentes/'},
            { id: Date.now() + 9, type: 'text', label: '', value: 'Referencias disponibles a petición.'}
        ]
    };

    // --- 2. DOM ELEMENTS & CONFIG ---
    const navItems = document.querySelectorAll('.nav-item');
    const formWrapper = document.getElementById('form-section-wrapper');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const cvPreviewWrapper = document.getElementById('cv-preview-wrapper');
    const iconOptions = {
        code: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
        briefcase: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
        pen: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
        chart: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
        lightbulb: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7c0-2.2-1.8-4-4-4S9.8 3.5 8.5 5.1"/><path d="M9 18c-1.3 0-2.5-.5-3.5-1.4C3.8 15 3 13.1 3 11c0-2.5 2-4.5 4.5-4.5"/><path d="M15 22v-4.5C15 15.4 13.9 14 12 14s-3 .3-3 3.5V22"/><path d="M12 14h0"/></svg>`,
        target: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        "graduation-cap": `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12v5c0 3 2.5 5 5 5s5-2 5-5v-5"/></svg>`,
        cog: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 2v2M12 22v-2M20 12h2M2 12h-2M19.78 4.22l-1.42 1.42M5.64 18.36l-1.42-1.42M19.78 19.78l-1.42-1.42M5.64 5.64L4.22 4.22"/></svg>`
    };
    const footerIcons = {
        email: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5l-8-5h16z"/></svg>`,
        phone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`,
        web: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-2v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41c0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
        linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m-1.39 9.94v-8.37H8.27v8.37H5.49z"/></svg>`,
        github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.89 1.53 2.34 1.09 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.95c0-1.09.39-1.98 1.03-2.68c-.1-.25-.45-1.27.1-2.64c0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.37.2 2.39.1 2.64c.64.7 1.03 1.59 1.03 2.68c0 3.85-2.34 4.7-4.57 4.94c.36.31.68.92.68 1.85v2.73c0 .27.18.58.69.48A10 10 0 0 0 22 12A10 10 0 0 0 12 2Z"/></svg>`,
        text: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>`
    };
    
    // --- 3. TEMPLATE & FORM FUNCTIONS ---
    const templates = {}; 
    const formRenderers = {};

    (function buildTemplateAndFormFunctions(){
        const levelLabels = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado', expert: 'Experto' };
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
            const [year, month] = dateStr.split('-');
            return `${months[parseInt(month, 10) - 1]} ${year}`;
        };
        const formatExperienceDate = (startDate, endDate, isCurrent) => {
            const start = formatDate(startDate);
            const end = isCurrent ? 'Actual' : formatDate(endDate);
            if (!start) return '';
            return `${start} - ${end}`;
        };
        const getFullName = (p) => `${p.firstName || ''} ${p.lastName || ''}`.trim();
        const renderAvatar = (data) => {
            const { avatar } = data;
            if (!avatar) return '';
            switch (avatar.type) {
                case 'photo': case 'url': return `<img src="${avatar.value}" style="width:100%; height:100%; object-fit:cover;">`;
                case 'initials': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); font-size:3rem; font-weight:bold; color: white;">${avatar.value || ''}</div>`;
                case 'icon': case 'svg': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); padding: 20px; color: white;">${avatar.value || ''}</div>`;
                default: return `<div style="width:100%; height:100%; background-color:#e0e0e0; display:flex; align-items:center; justify-content:center;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" stroke-width="1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;
            }
        };
        const renderFooter = (data, options = { color: '#555', borderColor: '#eee', bgColor: 'transparent', padding: '1.5rem' }) => {
            if (!data.footer || data.footer.length === 0) return '';
            
            const renderItem = (item) => {
                const icon = footerIcons[item.type] || '';
                const label = item.label ? `<strong style="margin-right: 0.3em;">${item.label}:</strong>` : '';
                let value = item.value || '';
                let link = value;

                if (item.type === 'email') link = `mailto:${value}`;
                else if (['web', 'linkedin', 'github'].includes(item.type)) link = `https://${value.replace(/^https?:\/\//, '')}`;
                
                const content = ['text'].includes(item.type)
                    ? `<span style="white-space:pre-wrap;">${label}${value}</span>`
                    : `<a href="${link}" target="_blank" style="color: inherit; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
                         ${icon} <span>${label}${value}</span>
                       </a>`;
                
                return `<div>${content}</div>`;
            };

            return `<footer style="font-size:0.85rem; text-align:center; color:${options.color}; background-color:${options.bgColor}; border-top:1px solid ${options.borderColor}; padding:${options.padding}; margin-top:auto; display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap: 1.5rem;">
                ${data.footer.map(renderItem).join('')}
            </footer>`;
        };

        templates.classic = (data) => `<div id="cv-template" style="display:flex; height:100%;"><div style="width:35%;background-color:${data.themeColor};color:white;padding:2rem;display:flex;flex-direction:column;gap:2rem"><div style="width:130px;height:130px;border-radius:50%;overflow:hidden;margin:0 auto;border:4px solid white;flex-shrink:0;box-shadow:0 4px 10px rgba(0,0,0,0.3)">${renderAvatar(data)}</div><div><h3 style="font-size:1rem;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:.5rem;margin-bottom:1rem">CONTACTO</h3>${data.personalInfo.phone?`<p style="font-size:.75rem;margin-bottom:.7rem"><strong>Teléfono:</strong><br>${data.personalInfo.phone}</p>`:''}${data.personalInfo.email?`<p style="font-size:.75rem;margin-bottom:.7rem;word-break:break-all"><strong>Email:</strong><br>${data.personalInfo.email}</p>`:''}${data.personalInfo.address?`<p style="font-size:.75rem;margin-bottom:.7rem"><strong>Dirección:</strong><br>${data.personalInfo.address}</p>`:''}${data.personalInfo.website?`<p style="font-size:.75rem;word-break:break-all"><strong>Web:</strong><br><a href="https://${data.personalInfo.website}" target="_blank" style="color:white;text-decoration:none">${data.personalInfo.website}</a></p>`:''}</div>${data.skills.length>0?`<div><h3 style="font-size:1rem;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:.5rem;margin-bottom:1rem">HABILIDADES</h3>${data.skills.map(s=>`<p style="font-size:.8rem;margin-bottom:.4rem">${s.name}<span style="font-size:.7rem;opacity:.8"> (${levelLabels[s.level]})</span></p>`).join('')}</div>`:''}</div><div style="width:65%; color:#333; display:flex; flex-direction:column;"><div style="padding:2.5rem; flex-grow:1;"><h1 style="font-family: var(--font-heading); font-size:2.3rem;font-weight:700;color:${data.themeColor};line-height:1.2;margin-bottom:.2rem">${data.personalInfo.firstName || ''}<br>${data.personalInfo.lastName || ''}</h1><h2 style="font-family: var(--font-heading); font-size:1.1rem;font-weight:500;margin-bottom:1.5rem;border-bottom:1px solid #eee;padding-bottom:.75rem">${data.personalInfo.title||''}</h2>${data.personalInfo.summary?`<div><h3 style="font-family: var(--font-heading); font-size:1rem;font-weight:600;color:${data.themeColor};border-bottom:2px solid ${data.themeColor};padding-bottom:.25rem;margin-bottom:.75rem;display:inline-block">RESUMEN</h3><p style="font-size:.8rem;line-height:1.6;white-space:pre-wrap">${data.personalInfo.summary}</p></div>`:''}${data.experience.length>0?`<div style="margin-top:1.5rem"><h3 style="font-family: var(--font-heading); font-size:1rem;font-weight:600;color:${data.themeColor};border-bottom:2px solid ${data.themeColor};padding-bottom:.25rem;margin-bottom:1rem;display:inline-block">EXPERIENCIA</h3>${data.experience.map(e=>`<div style="margin-bottom:1.2rem"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 style="font-size:.9rem;font-weight:600">${e.position||''}</h4><p style="font-size:.75rem;font-weight:500;color:#555;white-space:nowrap;margin-left:1rem">${formatExperienceDate(e.startDate,e.endDate,e.current)}</p></div><p style="font-size:.85rem;font-style:italic;margin-bottom:.3rem">${e.company||''}</p><p style="font-size:.8rem;white-space:pre-wrap;line-height:1.5">${e.description||''}</p></div>`).join('')}</div>`:''}${data.education.length>0?`<div style="margin-top:1.5rem"><h3 style="font-family: var(--font-heading); font-size:1rem;font-weight:600;color:${data.themeColor};border-bottom:2px solid ${data.themeColor};padding-bottom:.25rem;margin-bottom:1rem;display:inline-block">EDUCACIÓN</h3>${data.education.map(e=>`<div style="margin-bottom:1rem"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 style="font-size:.9rem;font-weight:600">${e.degree||''}</h4><p style="font-size:.75rem;font-weight:500;color:#555;white-space:nowrap;margin-left:1rem">${formatExperienceDate(e.startDate,e.endDate,e.current)}</p></div><p style="font-size:.85rem;font-style:italic;margin-bottom:.3rem">${e.institution||''}</p><p style="font-size:.8rem;white-space:pre-wrap;line-height:1.5">${e.description||''}</p></div>`).join('')}</div>`:''}</div>${renderFooter(data)}</div></div>`;
        templates.modern = (data) => `<div id="cv-template" style="display:flex;flex-direction:column;height:100%"><header style="padding:2.5rem;display:flex;align-items:center;gap:2rem;border-bottom:2px solid ${data.themeColor}"><div style="width:120px;height:120px;border-radius:50%;overflow:hidden;flex-shrink:0;background-color:${data.themeColor}">${renderAvatar(data)}</div><div><h1 style="font-family: var(--font-heading); font-size:2.3rem;font-weight:700;color:#333;line-height:1.1">${getFullName(data.personalInfo)}</h1><h2 style="font-family: var(--font-heading); font-size:1.1rem;font-weight:500;color:${data.themeColor}">${data.personalInfo.title||''}</h2></div></header><main style="padding:2.5rem;flex-grow:1;display:grid;grid-template-columns:2.5fr 1fr;gap:2.5rem"><div>${data.personalInfo.summary?`<div><h3 style="font-family: var(--font-heading); font-size:1rem;font-weight:600;color:${data.themeColor};border-bottom:2px solid ${data.themeColor};padding-bottom:.25rem;margin-bottom:.75rem;display:inline-block">RESUMEN</h3><p style="font-size:.8rem;line-height:1.6;white-space:pre-wrap">${data.personalInfo.summary}</p></div>`:''}${data.experience.length>0?`<div style="margin-top:1.5rem"><h3 style="font-family: var(--font-heading); font-size:1rem;font-weight:600;color:${data.themeColor};border-bottom:2px solid ${data.themeColor};padding-bottom:.25rem;margin-bottom:1rem;display:inline-block">EXPERIENCIA</h3>${data.experience.map(e=>`<div style="margin-bottom:1.2rem"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 style="font-size:.9rem;font-weight:600">${e.position||''}</h4><p style="font-size:.75rem;font-weight:500;color:#555;white-space:nowrap;margin-left:1rem">${formatExperienceDate(e.startDate,e.endDate,e.current)}</p></div><p style="font-size:.85rem;font-style:italic;margin-bottom:.3rem">${e.company||''}</p><p style="font-size:.8rem;white-space:pre-wrap;line-height:1.5">${e.description||''}</p></div>`).join('')}</div>`:''}${data.education.length>0?`<div style="margin-top:1.5rem"><h3 style="font-family: var(--font-heading); font-size:1rem;font-weight:600;color:${data.themeColor};border-bottom:2px solid ${data.themeColor};padding-bottom:.25rem;margin-bottom:1rem;display:inline-block">EDUCACIÓN</h3>${data.education.map(e=>`<div style="margin-bottom:1rem"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 style="font-size:.9rem;font-weight:600">${e.degree||''}</h4><p style="font-size:.75rem;font-weight:500;color:#555;white-space:nowrap;margin-left:1rem">${formatExperienceDate(e.startDate,e.endDate,e.current)}</p></div><p style="font-size:.85rem;font-style:italic;margin-bottom:.3rem">${e.institution||''}</p><p style="font-size:.8rem;white-space:pre-wrap;line-height:1.5">${e.description||''}</p></div>`).join('')}</div>`:''}</div><div>${data.skills.length>0?`<div><h3 style="font-family: var(--font-heading); font-size:1rem;font-weight:600;color:${data.themeColor};border-bottom:2px solid ${data.themeColor};padding-bottom:.25rem;margin-bottom:1rem;display:inline-block">HABILIDADES</h3>${data.skills.map(s=>`<p style="font-size:0.8rem;margin-bottom:.4rem">${s.name}<span style="font-size:.7rem;opacity:.8"> (${levelLabels[s.level]})</span></p>`).join('')}</div>`:''}</div></main>${renderFooter(data, {color: 'white', bgColor: data.themeColor, borderColor: data.themeColor})}</div>`;
        formRenderers.welcome = () => renderForm(`<div class="form-section" data-section="welcome"><h2 class="section-title">¡Bienvenido al Generador de CV Pro!</h2><p class="section-subtitle">Sigue estos sencillos pasos para crear tu currículum profesional.</p><div style="margin-top:2rem; display:flex; flex-direction:column; gap:1.5rem;"><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">1</div><div><h3 style="margin:0 0 0.2rem 0;">Personaliza el Diseño</h3><p style="color:var(--color-muted-text);">Ve a la sección "Diseño" para elegir una plantilla y tu color favorito.</p></div></div><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">2</div><div><h3 style="margin:0 0 0.2rem 0;">Completa las Secciones</h3><p style="color:var(--color-muted-text);">Usa la navegación para rellenar tu avatar, experiencia, educación y habilidades.</p></div></div><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">3</div><div><h3 style="margin:0 0 0.2rem 0;">Descarga y Triunfa</h3><p style="color:var(--color-muted-text);">Cuando estés listo, presiona "Descargar PDF" para obtener tu CV profesional.</p></div></div></div></div>`);
        formRenderers.design = () => { const hexColor = cvData.themeColor.startsWith('#') ? cvData.themeColor : '#525f7f'; renderForm(`<div class="form-section" data-section="design"><h2 class="section-title">Diseño y Apariencia</h2><p class="section-subtitle">Personaliza cómo se ve tu currículum.</p><div class="subsection-title">Color de Acento</div><div class="theme-selector"><div class="colors"><div class="color-dot ${cvData.themeColor==='#0d6efd'?'active':''}" data-color-value="#0d6efd" style="background:#0d6efd"></div><div class="color-dot ${cvData.themeColor==='#198754'?'active':''}" data-color-value="#198754" style="background:#198754"></div><div class="color-dot ${cvData.themeColor==='#6f42c1'?'active':''}" data-color-value="#6f42c1" style="background:#6f42c1"></div><div class="color-dot ${cvData.themeColor==='#dc3545'?'active':''}" data-color-value="#dc3545" style="background:#dc3545"></div><div class="color-dot ${cvData.themeColor==='#525f7f'?'active':''}" data-color-value="#525f7f" style="background:#525f7f"></div><input type="color" id="custom-color-picker" value="${hexColor}"></div></div><div class="subsection-title">Plantilla del CV</div><div class="layout-selector"><div class="layout-card ${cvData.layout==='classic'?'active':''}" data-layout="classic"><img src="https://i.imgur.com/rXBi2JN.png"><p>Clásico</p></div><div class="layout-card ${cvData.layout==='modern'?'active':''}" data-layout="modern"><img src="https://i.imgur.com/6ZweVTE.png"><p>Moderno</p></div><div class="layout-card ${cvData.layout==='compact'?'active':''}" data-layout="compact"><img src="https://i.imgur.com/vHExj4B.png"><p>Compacto</p></div><div class="layout-card ${cvData.layout==='executive'?'active':''}" data-layout="executive"><img src="https://i.imgur.com/H0nJtVf.png"><p>Ejecutivo</p></div><div class="layout-card ${cvData.layout==='creative'?'active':''}" data-layout="creative"><img src="https://i.imgur.com/152eA6A.png"><p>Creativo</p></div><div class="layout-card ${cvData.layout==='minimalist'?'active':''}" data-layout="minimalist"><img src="https://i.imgur.com/uC5iF5v.png"><p>Minimalista</p></div><div class="layout-card ${cvData.layout==='corporate'?'active':''}" data-layout="corporate"><img src="https://i.imgur.com/v8CoKg4.png"><p>Corporativo</p></div><div class="layout-card ${cvData.layout==='technical'?'active':''}" data-layout="technical"><img src="https://i.imgur.com/39w8A1N.png"><p>Técnico</p></div><div class="layout-card ${cvData.layout==='infographic'?'active':''}" data-layout="infographic"><img src="https://i.imgur.com/8Qp4kXm.png"><p>Infográfico</p></div><div class="layout-card ${cvData.layout==='academic'?'active':''}" data-layout="academic"><img src="https://i.imgur.com/p51aSP9.png"><p>Académico</p></div></div></div>`);};
        formRenderers.avatar = () => {const { type, value } = cvData.avatar || {type:'initials', value:''};renderForm(`<div class="form-section" data-section="avatar"><h2 class="section-title">Tu Avatar Profesional</h2><p class="section-subtitle">Elige cómo quieres presentarte.</p><div class="avatar-tabs"><div class="avatar-tab ${type==='photo'?'active':''}" data-type="photo">Foto</div><div class="avatar-tab ${type==='url'?'active':''}" data-type="url">URL Imagen</div><div class="avatar-tab ${type==='initials'?'active':''}" data-type="initials">Iniciales</div><div class="avatar-tab ${type==='icon'?'active':''}" data-type="icon">Icono</div><div class="avatar-tab ${type==='svg'?'active':''}" data-type="svg">Código SVG</div></div><div class="avatar-content ${type==='photo'?'active':''}" data-content="photo"><div style="display:flex;align-items:center;gap:1rem;"><img id="photo-preview" src="${type==='photo'&&value?value:'https://via.placeholder.com/120/e9ecef/6c757d?text=Foto'}"><div style="display:flex;flex-direction:column;gap:0.5rem;"><label for="photo-input" class="btn btn-secondary">Seleccionar Archivo</label><input type="file" id="photo-input" style="display:none;" accept="image/*">${type==='photo'&&value?'<button id="remove-photo-btn" class="btn">Eliminar Foto</button>':''}</div></div></div><div class="avatar-content ${type==='url'?'active':''}" data-content="url"><div class="form-group"><label for="image-url-input">URL de la imagen</label><input type="text" id="image-url-input" value="${type==='url'?value:''}" placeholder="https://ejemplo.com/foto.jpg"></div></div><div class="avatar-content ${type==='initials'?'active':''}" data-content="initials"><div class="form-group"><label for="initials-input">Tus Iniciales (1-3 caracteres)</label><input type="text" id="initials-input" maxlength="3" value="${type==='initials'?value:''}" placeholder="HD"></div></div><div class="avatar-content ${type==='icon'?'active':''}" data-content="icon"><p>Elige un ícono:</p><div class="icon-selector">${Object.entries(iconOptions).map(([key,svg])=>`<div class="icon-option ${type==='icon' && value===svg ? 'active' : ''}" data-icon-key="${key}">${svg}</div>`).join('')}</div></div><div class="avatar-content ${type==='svg'?'active':''}" data-content="svg"><div class="form-group"><label for="svg-code-input">Código SVG</label><textarea id="svg-code-input" placeholder='<svg width="24" ...></svg>' rows="5">${type==='svg'?value:''}</textarea></div></div></div>`);};
        formRenderers.personal = () => {const p=cvData.personalInfo;renderForm(`<div class="form-section" data-section="personal"><h2 class="section-title">Información Personal</h2><p class="section-subtitle">Los datos básicos para que puedan contactarte.</p><div class="form-grid"><div class="form-group"><label>Nombre(s)</label><input type="text" name="firstName" value="${p.firstName||''}"></div><div class="form-group"><label>Apellidos</label><input type="text" name="lastName" value="${p.lastName||''}"></div></div><div class="form-group"><label>Profesión</label><input type="text" name="title" value="${p.title||''}"></div><div class="form-grid"><div class="form-group"><label>Email</label><input type="email" name="email" value="${p.email||''}"></div><div class="form-group"><label>Teléfono</label><input type="tel" name="phone" value="${p.phone||''}"></div></div><div class="form-group"><label>Dirección</label><input type="text" name="address" value="${p.address||''}"></div><div class="form-group"><label>Web (sin https://)</label><input type="text" name="website" value="${p.website||''}"></div><div class="form-group"><label>Resumen</label><textarea name="summary" rows="5">${p.summary||''}</textarea></div></div>`)};
        formRenderers.skills = () => {renderForm(`<div class="form-section" data-section="skills"><h2 class="section-title">Habilidades</h2><p class="section-subtitle">Añade las tecnologías y competencias que dominas.</p><form id="skills-form" style="display:flex; gap:1rem; align-items:flex-end; margin-bottom:1.5rem;"><div class="form-group" style="flex-grow:1; margin-bottom:0;"><label for="skillName">Habilidad</label><input id="skillName" placeholder="Python..."></div><div class="form-group" style="margin-bottom:0;"><label for="skillLevel">Nivel</label><select id="skillLevel"><option value="expert">Experto</option><option value="advanced">Avanzado</option><option value="intermediate">Intermedio</option><option value="beginner">Principiante</option></select></div><button type="submit" class="btn btn-secondary" style="height:fit-content;">+ Añadir</button></form><hr style="margin:1.5rem 0;border:none;border-top:1px solid var(--color-border);"><div class="skills-list">${cvData.skills.map(s=>`<div class="skill-badge" data-id="${s.id}">${s.name}<button class="btn-delete" data-action="delete" data-section="skills" data-id="${s.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>`).join('')}</div></div>`)};
        const dynamicListRenderer = (section, config) => {renderForm(`<div class="form-section" data-section="${section}"><h2 class="section-title">${config.title}</h2><p class="section-subtitle">${config.subtitle}</p><div class="add-item-container"><button class="btn btn-secondary" data-action="add" data-section="${section}">+ Añadir ${config.singularTitle}</button></div><div class="dynamic-list">${cvData[section].map(item=>`<div class="item" data-id="${item.id}"><div class="item-header"><h4>${item.position||item.degree||'Nuevo Elemento'}</h4><button class="btn-delete" data-action="delete" data-section="${section}" data-id="${item.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div><div class="form-grid"><div class="form-group"><label>${config.field1}</label><input type="text" name="${config.name1}" value="${item[config.name1]||''}"></div><div class="form-group"><label>${config.field2}</label><input type="text" name="${config.name2}" value="${item[config.name2]||''}"></div></div><div class="form-grid"><div class="form-group"><label>Fecha Inicio</label><input type="month" name="startDate" value="${item.startDate||''}"></div><div class="form-group"><label>Fecha Fin</label><input type="month" name="endDate" value="${item.endDate||''}" ${item.current?'disabled':''}></div></div><div class="form-group" style="font-size:.9rem;"><label style="display:flex;align-items:center;gap:.5rem;"><input type="checkbox" name="current" ${item.current?'checked':''}> Actualmente aquí</label></div><div class="form-group"><label>Descripción</label><textarea name="description" rows="4">${item.description||''}</textarea></div></div>`).join('')}</div></div>`);}
        formRenderers.experience = () => dynamicListRenderer('experience', {title:'Experiencia Laboral', singularTitle: 'Experiencia', subtitle:'Describe tus roles anteriores.', field1:'Cargo', name1:'position', field2:'Empresa', name2:'company'});
        formRenderers.education = () => dynamicListRenderer('education', {title:'Educación', singularTitle: 'Formación', subtitle:'Tu formación académica.', field1:'Título', name1:'degree', field2:'Institución', name2:'institution'});
    })();

    // --- 4. CORE FUNCTIONS ---
    const renderForm = (html) => {
        formWrapper.innerHTML = html;
        requestAnimationFrame(() => formWrapper.querySelector('.form-section')?.classList.add('active'));
    };
    const renderCVPreview = () => {
        const themeColor = cvData.themeColor || '#525f7f';
        document.documentElement.style.setProperty('--primary-accent', themeColor);
        const layout = cvData.layout || 'classic';
        cvPreviewWrapper.dataset.layout = layout;
        const templateFn = templates[layout] || templates.classic;
        cvPreviewWrapper.innerHTML = templateFn(cvData);
    };
    const setActiveSection = (sectionName) => {
        if (!sectionName) return;
        navItems.forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${sectionName}`));
        formRenderers[sectionName]?.();
    };

    // --- 5. INITIALIZATION & EVENT LISTENERS ---
    function init() {
        downloadPdfBtn.addEventListener('click', () => window.print());
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                setActiveSection(item.getAttribute('href').substring(1));
            });
        });

        formWrapper.addEventListener('input', (e) => {
            const { target } = e; 
            const section = target.closest('.form-section')?.dataset.section; 
            if (!section) return;

            if (section === 'personal') {
                cvData.personalInfo[target.name] = target.value;
            } else if (section === 'experience' || section === 'education') {
                const itemEl = target.closest('.item');
                const item = cvData[section].find(i => i.id == itemEl.dataset.id);
                if (item) {
                    item[target.name] = target.type === 'checkbox' ? target.checked : target.value;
                    if (target.name === 'current') {
                        const endDateInput = itemEl.querySelector('input[name="endDate"]');
                        if (endDateInput) endDateInput.disabled = target.checked;
                        if (target.checked) item.endDate = '';
                    }
                }
            } else if (section === 'design' && target.id === 'custom-color-picker') {
                cvData.themeColor = target.value;
            } else if (section === 'avatar') {
                if (target.id === 'initials-input') cvData.avatar = { type: 'initials', value: target.value.toUpperCase() };
                if (target.id === 'image-url-input') cvData.avatar = { type: 'url', value: target.value };
                if (target.id === 'svg-code-input') cvData.avatar = { type: 'svg', value: target.value };
            }
            renderCVPreview();
        });

        formWrapper.addEventListener('click', (e) => {
            const button = e.target.closest('button, .avatar-tab, .icon-option, .layout-card, .color-dot');
            if (!button) return;

            const section = button.dataset.section || button.closest('.form-section')?.dataset.section;
            const action = button.dataset.action || 
                           (button.classList.contains('avatar-tab') && 'switchTab') || 
                           (button.classList.contains('icon-option') && 'selectIcon') || 
                           (button.id === 'remove-photo-btn' && 'removePhoto') || 
                           (button.classList.contains('layout-card') && 'selectLayout') || 
                           (button.classList.contains('color-dot') && 'selectColor');
            
            if (action) {
                 if (section === 'footer' && action === 'add') {
                    const typeInput = document.getElementById('footer-item-type');
                    const labelInput = document.getElementById('footer-item-label');
                    const valueInput = document.getElementById('footer-item-value');

                    if (valueInput.value.trim()) {
                        cvData.footer.push({
                            id: Date.now(),
                            type: typeInput.value,
                            label: labelInput.value.trim(),
                            value: valueInput.value.trim()
                        });
                        labelInput.value = '';
                        valueInput.value = '';
                    }
                } else if (action === 'add') {
                    cvData[section].push({ id: Date.now(), description: '' });
                } else if (action === 'delete') {
                    cvData[section] = cvData[section].filter(i => i.id != button.dataset.id);
                } else if (action === 'switchTab') {
                    const newType = button.dataset.type;
                    if (cvData.avatar.type !== newType) {
                        cvData.avatar.type = newType;
                        cvData.avatar.value = '';
                    }
                } else if (action === 'selectIcon') {
                    cvData.avatar = { type: 'icon', value: iconOptions[button.dataset.iconKey] };
                } else if (action === 'removePhoto') {
                    cvData.avatar = { type: 'photo', value: '' };
                } else if (action === 'selectLayout') {
                    cvData.layout = button.dataset.layout;
                } else if (action === 'selectColor') {
                    cvData.themeColor = button.dataset.colorValue;
                }
                
                if(section) setActiveSection(section);
                renderCVPreview();
            }
        });

        formWrapper.addEventListener('submit', (e) => {
            if (e.target.id === 'skills-form') {
                e.preventDefault();
                const nameInput = e.target.querySelector('#skillName');
                const level = e.target.querySelector('#skillLevel').value;
                if (nameInput.value.trim()) {
                    cvData.skills.push({ id: Date.now(), name: nameInput.value.trim(), level });
                    setActiveSection('skills');
                    renderCVPreview();
                }
            }
        });

        formWrapper.addEventListener('change', (e) => {
            if (e.target.id === 'photo-input' && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    cvData.avatar = { type: 'photo', value: event.target.result };
                    setActiveSection('avatar');
                    renderCVPreview();
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        
        setActiveSection('welcome');
        renderCVPreview();
    }

    init();
});