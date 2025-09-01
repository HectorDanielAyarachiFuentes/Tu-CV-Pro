document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. STATE MANAGEMENT ---
    let cvData = {
        layout: 'classic', 
        themeColor: '#dc3545',
        backgroundGradient: '', // Almacenará el gradiente seleccionado
        avatar: { type: 'initials', value: 'HD' }, 
        personalInfo: { 
            firstName: 'Hector Daniel', 
            lastName: 'Ayarachi Fuentes', 
            title: 'Desarrollador de Software', 
            email: 'mp4o@yahoo.com', 
            phone: '2995056200', 
            address: 'Neuquen, Argentina', 
            website: 'linkedin.com/in/hector-daniel-ayarachi-fuentes/', 
            summary: 'Soy un desarrollador de software con una sólida experiencia en la creación de aplicaciones web escalables y eficientes. Mi enfoque principal se centra en el desarrollo backend, donde tengo un profundo conocimiento de Python y el ecosistema de AWS. Además, he trabajado en proyectos de DevOps para mejorar la eficiencia y la automatización de los procesos de desarrollo.' 
        },
        experience: [{ id: Date.now() + 1, position: 'Desarrollador Backend Senior', company: 'Tech Solutions Inc.', startDate: '2020-02', endDate: '', current: true, description: '- Lideré el desarrollo del microservicio de pagos.\n- Optimicé consultas a la base de datos, mejorando el rendimiento en un 40%.\n- Implementé pipelines de CI/CD con Jenkins y Docker.' }],
        education: [{ id: Date.now() + 2, degree: 'Ingeniería en Sistemas de Información', institution: 'Universidad Tecnológica Nacional', startDate: '2014-04', endDate: '2020-01', current: false, description: 'Proyecto final sobre optimización de redes neuronales.' }],
        skills: [{ id: Date.now() + 3, name: 'Python', level: 'expert' }, { id: Date.now() + 4, name: 'AWS', level: 'advanced' }, { id: Date.now() + 5, name: 'Docker', level: 'advanced' }, { id: Date.now() + 6, name: 'JavaScript', level: 'intermediate' }],
        impacts: [
            { id: Date.now() + 13, description: 'Optimicé consultas a la base de datos, mejorando el rendimiento en un 40%.' },
            { id: Date.now() + 14, description: 'Reduje los costos de infraestructura en AWS en un 25% mediante la optimización de instancias EC2.' }
        ],
        footer: [
            { id: Date.now() + 7, type: 'email', label: '', value: 'mp4o@yahoo.com'},
            { id: Date.now() + 8, type: 'linkedin', label: 'LinkedIn', value: 'in/hector-daniel-ayarachi-fuentes/'},
            { id: Date.now() + 9, type: 'text', label: '', value: 'Referencias disponibles a petición.'}
        ],
        portfolio: [
            { id: Date.now() + 10, img: 'https://github.com/HectorDanielAyarachiFuentes/Tu-CV-Pro/blob/main/img/portafolio-img.jpeg?raw=true', title: 'Diseño de App Móvil' },
            { id: Date.now() + 11, img: 'https://github.com/HectorDanielAyarachiFuentes/Tu-CV-Pro/blob/main/img/portafolio-4.png?raw=true', title: 'Branding Corporativo' },
            { id: Date.now() + 12, img: 'https://github.com/HectorDanielAyarachiFuentes/Tu-CV-Pro/blob/main/img/portafolio-3.jpeg?raw=true', title: 'Ilustración Digital' }
        ]
    };

    // --- 2. DOM ELEMENTS & CONFIG ---
    const formWrapper = document.getElementById('form-section-wrapper');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const cvPreviewWrapper = document.getElementById('cv-preview-wrapper');

    const gradientPresets = [
        'linear-gradient(45deg, #ff6b6b 0%, #ff6b6b 20%, #f06595 20%, #f06595 40%, #845ef7 40%, #845ef7 60%, #5c7cfa 60%, #5c7cfa 80%, #339af0 80%, #339af0 100%)',
        'linear-gradient(45deg, #ffa94d 0%, #ffa94d 25%, #f76707 25%, #f76707 50%, #e8590c 50%, #e8590c 75%, #d9480f 75%, #d9480f 100%)',
        'linear-gradient(45deg, #12b886 0%, #12b886 20%, #20c997 20%, #20c997 40%, #15aabf 40%, #15aabf 60%, #228be6 60%, #228be6 80%, #364fc7 80%, #364fc7 100%)',
        'linear-gradient(45deg, #ff922b 0%, #ff922b 30%, #fab005 30%, #fab005 60%, #ffd43b 60%, #ffd43b 100%)',
        'linear-gradient(45deg, #7048e8 0%, #7048e8 20%, #5f3dc4 20%, #5f3dc4 40%, #4263eb 40%, #4263eb 60%, #3b5bdb 60%, #3b5bdb 80%, #1864ab 80%, #1864ab 100%)',
        'linear-gradient(45deg, #ff8787 0%, #ff8787 25%, #f783ac 25%, #f783ac 50%, #e599f7 50%, #e599f7 75%, #b197fc 75%, #b197fc 100%)',
        'linear-gradient(45deg, #dee2e6 0%, #dee2e6 20%, #adb5bd 20%, #adb5bd 40%, #868e96 40%, #868e96 60%, #495057 60%, #495057 80%, #212529 80%, #212529 100%)',
        'linear-gradient(45deg, #69db7c 0%, #69db7c 25%, #38d9a9 25%, #38d9a9 50%, #4dabf7 50%, #4dabf7 75%, #9775fa 75%, #9775fa 100%)',
        'linear-gradient(45deg, #ffec99 0%, #ffec99 20%, #ffd43b 20%, #ffd43b 40%, #fab005 40%, #fab005 60%, #f08c00 60%, #f08c00 80%, #e67700 80%, #e67700 100%)',
        'linear-gradient(45deg, #ff6b6b 0%, #ff6b6b 50%, #1c7ed6 50%, #1c7ed6 100%)',
        'linear-gradient(45deg, #12b886 0%, #12b886 25%, #228be6 25%, #228be6 50%, #845ef7 50%, #845ef7 75%, #f783ac 75%, #f783ac 100%)',
        'linear-gradient(45deg, #c92a2a 0%, #c92a2a 20%, #a61e4d 20%, #a61e4d 40%, #862e9c 40%, #862e9c 60%, #364fc7 60%, #364fc7 80%, #1864ab 80%, #1864ab 100%)',
        'linear-gradient(45deg, #0ca678 0%, #0ca678 50%, #e67700 50%, #e67700 100%)',
        'linear-gradient(45deg, #f03e3e 0%, #f03e3e 25%, #d6336c 25%, #d6336c 50%, #7048e8 50%, #7048e8 75%, #1864ab 75%, #1864ab 100%)',
        'linear-gradient(45deg, #fff9db 0%, #fff9db 20%, #ffe066 20%, #ffe066 40%, #fcc419 40%, #fcc419 60%, #e67700 60%, #e67700 80%, #d9480f 80%, #d9480f 100%)',
        'linear-gradient(45deg, #a9e34b 0%, #a9e34b 25%, #82c91e 25%, #82c91e 50%, #5c940d 50%, #5c940d 75%, #2b8a3e 75%, #2b8a3e 100%)',
        'linear-gradient(45deg, #4dabf7 0%, #4dabf7 20%, #339af0 20%, #339af0 40%, #1c7ed6 40%, #1c7ed6 60%, #1971c2 60%, #1971c2 80%, #1864ab 80%, #1864ab 100%)',
        'linear-gradient(45deg, #f783ac 0%, #f783ac 33%, #b197fc 33%, #b197fc 66%, #74c0fc 66%, #74c0fc 100%)',
        'linear-gradient(45deg, #2b8a3e 0%, #2b8a3e 25%, #1864ab 25%, #1864ab 50%, #5f3dc4 50%, #5f3dc4 75%, #c92a2a 75%, #c92a2a 100%)',
        'linear-gradient(45deg, #fff 0%, #fff 25%, #f1f3f5 25%, #f1f3f5 50%, #dee2e6 50%, #dee2e6 75%, #adb5bd 75%, #adb5bd 100%)'
    ];

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

    const buildTemplateAndFormFunctions = () => {
        const levelLabels = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado', expert: 'Experto' };
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
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
        const getInitials = (p) => `${p.firstName ? p.firstName[0] : ''}${p.lastName ? p.lastName[0] : ''}`;
        const renderAvatar = (data) => {
            const { avatar } = data;
            if (!avatar || avatar.type === 'none') return ''; 
            switch (avatar.type) {
                case 'photo': case 'url': return `<img src="${avatar.value}" style="width:100%; height:100%; object-fit:cover;">`;
                case 'initials': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); font-size:3rem; font-weight:bold; color: white;">${avatar.value || getInitials(data.personalInfo)}</div>`;
                case 'icon': case 'svg': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); padding: 20px; color: white;">${avatar.value || ''}</div>`;
                case 'quote': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding: 1rem; text-align:center; background-color:rgba(0,0,0,0.1); color:white; font-family: var(--font-serif); font-style:italic;">“${avatar.value || 'Tu cita profesional aquí...'}”</div>`;
                case 'qr':
                    const qrUrl = avatar.value ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(avatar.value)}` : 'https://via.placeholder.com/150/ffffff/cccccc?text=QR';
                    return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:white; padding:10px;"><img src="${qrUrl}" style="width:100%; height:100%; object-fit:contain;"></div>`;
                default: return `<div style="width:100%; height:100%; background-color:#e0e0e0; display:flex; align-items:center; justify-content:center;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" stroke-width="1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;
            }
        };
        const renderAvatarContainer = (data, innerHTML) => {
            if (data.avatar && data.avatar.type === 'none') {
                return '';
            }
            return innerHTML;
        };
        const renderFooter = (data, options = { color: '#555', borderColor: '#eee', bgColor: 'transparent', padding: '1.5rem' }) => {
            if (!data.footer || data.footer.length === 0) return '';
            const renderItem = (item) => {
                const icon = footerIcons[item.type] || ''; let link = `https://${(item.value || '').replace(/^https?:\/\//, '')}`;
                if (item.type === 'email') link = `mailto:${item.value}`;
                const content = ['text'].includes(item.type) ? `<span>${item.value}</span>` : `<a href="${link}" target="_blank" style="color: inherit; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">${icon} <span>${item.label || item.value}</span></a>`;
                return `<div>${content}</div>`;
            };
            return `<footer style="font-size:0.85rem; text-align:center; color:${options.color}; background-color:${options.bgColor}; border-top:1px solid ${options.borderColor}; padding:${options.padding}; margin-top:auto; display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap: 1.5rem;">${data.footer.map(renderItem).join('')}</footer>`;
        };
        const renderGenericSection = (title, items, renderItemFn, color, style = '') => {
             if (!items || items.length === 0) return '';
             return `<div style="margin-top:1.5rem; ${style}"><h3 style="font-family: var(--font-heading); font-size:1rem; font-weight:600; color:${color}; border-bottom:2px solid ${color}; padding-bottom:.25rem; margin-bottom:1rem; display:inline-block; text-transform: uppercase;">${title}</h3>${items.map(renderItemFn).join('')}</div>`;
        };
        const renderExperienceItem = (e) => `<div style="margin-bottom:1.2rem"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 style="font-size:.9rem;font-weight:600">${e.position||''}</h4><p style="font-size:.75rem;font-weight:500;color:#555;white-space:nowrap;margin-left:1rem">${formatExperienceDate(e.startDate,e.endDate,e.current)}</p></div><p style="font-size:.85rem;font-style:italic;margin-bottom:.3rem">${e.company||''}</p><p style="font-size:.8rem;white-space:pre-wrap;line-height:1.5">${e.description||''}</p></div>`;
        const renderEducationItem = (e) => `<div style="margin-bottom:1rem"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 style="font-size:.9rem;font-weight:600">${e.degree||''}</h4><p style="font-size:.75rem;font-weight:500;color:#555;white-space:nowrap;margin-left:1rem">${formatExperienceDate(e.startDate,e.endDate,e.current)}</p></div><p style="font-size:.85rem;font-style:italic;margin-bottom:.3rem">${e.institution||''}</p><p style="font-size:.8rem;white-space:pre-wrap;line-height:1.5">${e.description||''}</p></div>`;
        
        // --- PLANTILLAS DE CV ---
        templates.classic = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : ''; return `<div id="cv-template" style="display:flex; height:100%; ${bgStyle}"><div style="width:35%;background-color:${data.themeColor};color:white;padding:2rem;display:flex;flex-direction:column;gap:2rem">${renderAvatarContainer(data, `<div style="width:130px;height:130px;border-radius:50%;overflow:hidden;margin:0 auto;border:4px solid white;flex-shrink:0;box-shadow:0 4px 10px rgba(0,0,0,0.3)">${renderAvatar(data)}</div>`)}<div><h3 style="font-size:1rem;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:.5rem;margin-bottom:1rem">CONTACTO</h3>${data.personalInfo.phone?`<p style="font-size:.75rem;margin-bottom:.7rem"><strong>Teléfono:</strong><br>${data.personalInfo.phone}</p>`:''}${data.personalInfo.email?`<p style="font-size:.75rem;margin-bottom:.7rem;word-break:break-all"><strong>Email:</strong><br>${data.personalInfo.email}</p>`:''}${data.personalInfo.address?`<p style="font-size:.75rem;margin-bottom:.7rem"><strong>Dirección:</strong><br>${data.personalInfo.address}</p>`:''}${data.personalInfo.website?`<p style="font-size:.75rem;word-break:break-all"><strong>Web:</strong><br><a href="https://${data.personalInfo.website}" target="_blank" style="color:white;text-decoration:none">${data.personalInfo.website}</a></p>`:''}</div>${data.skills.length>0?`<div><h3 style="font-size:1rem;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:.5rem;margin-bottom:1rem">HABILIDADES</h3>${data.skills.map(s=>`<p style="font-size:.8rem;margin-bottom:.4rem">${s.name}<span style="font-size:.7rem;opacity:.8"> (${levelLabels[s.level]})</span></p>`).join('')}</div>`:''}</div><div style="width:65%; color:#333; display:flex; flex-direction:column;"><div style="padding:2.5rem; flex-grow:1;"><h1 style="font-family: var(--font-heading); font-size:2.0rem;font-weight:700;color:${data.themeColor};line-height:1.2;margin-bottom:.5rem">${getFullName(data.personalInfo)}</h1><h2 style="font-family: var(--font-heading); font-size:1.1rem;font-weight:500;margin-bottom:1.5rem;border-bottom:1px solid #eee;padding-bottom:.75rem">${data.personalInfo.title||''}</h2>${renderGenericSection('Resumen', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="font-size:.8rem;line-height:1.6;white-space:pre-wrap">${item.text}</p>`, data.themeColor)}${renderGenericSection('Experiencia', data.experience, renderExperienceItem, data.themeColor)}${renderGenericSection('Educación', data.education, renderEducationItem, data.themeColor)}</div>${renderFooter(data)}</div></div>`; };
        templates.creative = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : 'background-color: #f8f9fa;'; return `<div id="cv-template" style="height:100%; display:flex; flex-direction:column; ${bgStyle}"><div style="height: 120px; background-color:${data.themeColor}; flex-shrink:0;"></div><div style="flex-grow:1; margin: 0 2rem 2rem; margin-top: -80px; background-color: white; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-radius: 4px; display:flex; flex-direction:column;"><header style="text-align:center; padding: 1.5rem; border-bottom: 1px solid #eee;">${renderAvatarContainer(data, `<div style="width:160px; height:160px; border-radius:50%; overflow:hidden; border: 8px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: 0 auto 1.5rem; background-color:${data.themeColor};">${renderAvatar(data)}</div>`)}<h1 style="font-family:var(--font-heading); font-size:2.2rem; line-height:1.2; color:#333; margin-bottom: 0.25rem;">${getFullName(data.personalInfo)}</h1><h2 style="font-family:var(--font-heading); font-size:1.1rem; font-weight:500; color:${data.themeColor};">${data.personalInfo.title||''}</h2></header><main style="padding: 1.5rem 2.5rem; flex-grow:1; overflow-y: auto;">${renderGenericSection('Resumen', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="font-size:.85rem;line-height:1.6;white-space:pre-wrap;">${item.text}</p>`, data.themeColor, 'margin-top:0;')}${renderGenericSection('Experiencia', data.experience, renderExperienceItem, data.themeColor)}${renderGenericSection('Educación', data.education, renderEducationItem, data.themeColor)}${renderGenericSection('Habilidades', data.skills, s => `<span style="display:inline-block; background-color:#f1f1f1; color:#333; padding: 0.3rem 0.8rem; border-radius: 4px; margin: 0.2rem; font-size:0.85rem;">${s.name}</span>`, data.themeColor)}</main></div></div>`; };
        templates.modern = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : ''; return `<div id="cv-template" style="display:flex;flex-direction:column;height:100%; ${bgStyle}"><header style="padding:2.5rem;display:flex;align-items:center;gap:2rem;border-bottom:2px solid ${data.themeColor}">${renderAvatarContainer(data, `<div style="width:120px;height:120px;border-radius:50%;overflow:hidden;flex-shrink:0;background-color:${data.themeColor}">${renderAvatar(data)}</div>`)}<div><h1 style="font-family: var(--font-heading); font-size:2.3rem;font-weight:700;color:#333;line-height:1.1">${getFullName(data.personalInfo)}</h1><h2 style="font-family: var(--font-heading); font-size:1.1rem;font-weight:500;color:${data.themeColor}">${data.personalInfo.title||''}</h2></div></header><main style="padding:2.5rem;flex-grow:1;display:grid;grid-template-columns:2.5fr 1fr;gap:2.5rem"><div>${renderGenericSection('Resumen', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="font-size:.8rem;line-height:1.6;white-space:pre-wrap">${item.text}</p>`, data.themeColor)}${renderGenericSection('Experiencia', data.experience, renderExperienceItem, data.themeColor)}${renderGenericSection('Educación', data.education, renderEducationItem, data.themeColor)}</div><div>${renderGenericSection('Habilidades', data.skills, s => `<p style="font-size:0.8rem;margin-bottom:.4rem">${s.name}<span style="font-size:.7rem;opacity:.8"> (${levelLabels[s.level]})</span></p>`, data.themeColor)}</div></main>${renderFooter(data, {color: 'white', bgColor: data.themeColor, borderColor: data.themeColor})}</div>`; };
        templates.compact = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : ''; return `<div id="cv-template" style="display:flex; flex-direction:column; height:100%; padding: 2rem; font-size: 0.9rem; ${bgStyle}"><header style="display:flex; gap: 1.5rem; border-bottom: 2px solid ${data.themeColor}; padding-bottom: 1.5rem;">${renderAvatarContainer(data, `<div style="width:90px; height:90px; border-radius:50%; overflow:hidden; flex-shrink:0; background-color:${data.themeColor}">${renderAvatar(data)}</div>`)}<div style="width:100%;"><h1 style="font-family:var(--font-heading); font-size:2rem; font-weight:700; color:${data.themeColor}">${getFullName(data.personalInfo)}</h1><h2 style="font-family:var(--font-heading); font-size:1rem; font-weight:500; margin-bottom:0.5rem;">${data.personalInfo.title||''}</h2><div style="display:flex; flex-wrap:wrap; gap: 0.5rem 1.5rem; font-size:0.75rem; color:#555;">${data.personalInfo.email?`<span>${footerIcons.email} ${data.personalInfo.email}</span>`:''}${data.personalInfo.phone?`<span>${footerIcons.phone} ${data.personalInfo.phone}</span>`:''}${data.personalInfo.website?`<span>${footerIcons.web} ${data.personalInfo.website}</span>`:''}</div></div></header><main style="flex-grow:1; margin-top:1.5rem; display:grid; grid-template-columns:2fr 1fr; gap:2rem;"><div>${renderGenericSection('Experiencia', data.experience, renderExperienceItem, data.themeColor)}${renderGenericSection('Educación', data.education, renderEducationItem, data.themeColor)}</div><div>${renderGenericSection('Resumen', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="font-size:.8rem;line-height:1.5;white-space:pre-wrap">${item.text}</p>`, data.themeColor)}${renderGenericSection('Habilidades', data.skills, s => `<p style="font-size:.8rem;margin-bottom:.3rem">${s.name}</p>`, data.themeColor)}</div></main>${renderFooter(data, {padding: '1rem'})}</div>`; };
        templates.executive = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : ''; return `<div id="cv-template" style="display:flex; flex-direction:column; height:100%; padding: 3rem; text-align:center; ${bgStyle}"><header style="padding-bottom: 1.5rem; margin-bottom:1.5rem; border-bottom: 2px solid ${data.themeColor};"><h1 style="font-family:var(--font-serif); font-size:2.4rem; font-weight:600;">${getFullName(data.personalInfo)}</h1><h2 style="font-family:var(--font-serif); font-size:1.2rem; font-weight:400; color:#444;">${data.personalInfo.title||''}</h2></header><main style="flex-grow:1; text-align:left;">${renderGenericSection('Resumen', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="font-size:.9rem; text-align:center; line-height:1.7;white-space:pre-wrap; max-width: 80ch; margin: 0 auto;">${item.text}</p>`, data.themeColor)}${renderGenericSection('Experiencia', data.experience, renderExperienceItem, data.themeColor)}${renderGenericSection('Educación', data.education, renderEducationItem, data.themeColor)}${renderGenericSection('Habilidades', data.skills, s => `<span style="display:inline-block; background-color:#f1f1f1; color:#333; padding: 0.3rem 0.8rem; border-radius: 4px; margin: 0.2rem; font-size:0.85rem;">${s.name}</span>`, data.themeColor)}</main>${renderFooter(data)}</div>`; };
        templates.minimalist = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : 'background:white;'; return `<div id="cv-template" style="display:flex; flex-direction:column; height:100%; padding: 4rem; ${bgStyle}"><header style="margin-bottom: 3rem;"><h1 style="font-family:var(--font-heading); font-size:2.5rem; font-weight:400;">${getFullName(data.personalInfo)}</h1><h2 style="font-family:var(--font-heading); font-size:1.1rem; font-weight:400; color:${data.themeColor}; margin-top:0.25rem;">${data.personalInfo.title||''}</h2></header><main style="flex-grow:1; font-size:0.9rem; line-height:1.8;">${data.personalInfo.summary ? `<p style="margin-bottom:2rem; white-space:pre-wrap;">${data.personalInfo.summary}</p>`:''}${renderGenericSection('Experiencia', data.experience, e => `<div style="margin-bottom:1.5rem; display:grid; grid-template-columns: 150px 1fr; gap:1rem;"><p style="font-size:.75rem; color:#666;">${formatExperienceDate(e.startDate,e.endDate,e.current)}</p><div><h4 style="font-weight:600;">${e.position||''}</h4><p style="font-style:italic;">${e.company||''}</p></div></div>`, data.themeColor)}${renderGenericSection('Educación', data.education, e => `<div style="margin-bottom:1.5rem; display:grid; grid-template-columns: 150px 1fr; gap:1rem;"><p style="font-size:.75rem; color:#666;">${formatExperienceDate(e.startDate,e.endDate,e.current)}</p><div><h4 style="font-weight:600;">${e.degree||''}</h4><p style="font-style:italic;">${e.institution||''}</p></div></div>`, data.themeColor)}</main>${renderFooter(data)}</div>`; };
        templates.corporate = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : ''; return `<div id="cv-template" style="display:flex; height:100%; ${bgStyle}"><div style="width:30%; background-color:#f8f9fa; padding:2rem; border-right:1px solid #eee;"><div style="text-align:center; margin-bottom:2rem;">${renderAvatarContainer(data, `<div style="width:110px; height:110px; border-radius:50%; overflow:hidden; margin:0 auto 1rem; background-color:#ddd;">${renderAvatar(data)}</div>`)}<h1 style="font-family:var(--font-heading); font-size:1.6rem; color:${data.themeColor}; line-height:1.2;">${getFullName(data.personalInfo)}</h1><h2 style="font-family:var(--font-heading); font-size:0.9rem; font-weight:500; color:#555;">${data.personalInfo.title||''}</h2></div><div><h3 style="font-size:0.9rem; color:${data.themeColor}; border-bottom:1px solid #ddd; padding-bottom:0.4rem; margin-bottom:0.8rem;">CONTACTO</h3><p style="font-size:.75rem; margin-bottom:0.5rem; word-break:break-all;">${data.personalInfo.email||''}</p><p style="font-size:.75rem; margin-bottom:0.5rem;">${data.personalInfo.phone||''}</p><p style="font-size:.75rem; margin-bottom:0.5rem; word-break:break-all;">${data.personalInfo.website||''}</p></div>${renderGenericSection('Habilidades', data.skills, s => `<p style="font-size:.8rem;margin-bottom:.4rem">${s.name}</p>`, data.themeColor)}</div><div style="width:70%; padding:2.5rem; display:flex;flex-direction:column;"><main style="flex-grow:1">${renderGenericSection('Resumen', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="font-size:.8rem;line-height:1.6;white-space:pre-wrap">${item.text}</p>`, data.themeColor)}${renderGenericSection('Experiencia', data.experience, renderExperienceItem, data.themeColor)}${renderGenericSection('Educación', data.education, renderEducationItem, data.themeColor)}</main>${renderFooter(data)}</div></div>`; };
        templates.technical = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : 'background:#fdfdfd;'; return `<div id="cv-template" style="display:flex; flex-direction:column; height:100%; padding: 2.5rem; font-family: var(--font-mono); ${bgStyle}"><header style="padding-bottom:1rem; margin-bottom:1rem; border-bottom:1px solid #ccc;"><h1 style="font-family: var(--font-heading); font-size:2.2rem; font-weight:600;">${getFullName(data.personalInfo)} &gt; <span style="color:${data.themeColor};">${data.personalInfo.title||'Professional'}</span></h1><div style="font-size:0.8rem; color:#555;">// ${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.website}</div></header><main style="flex-grow:1;">${renderGenericSection('// SUMMARY', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="font-size:.85rem;line-height:1.6;white-space:pre-wrap">${item.text}</p>`, data.themeColor)}${renderGenericSection('// EXPERIENCE', data.experience, renderExperienceItem, data.themeColor)}${renderGenericSection('// EDUCATION', data.education, renderEducationItem, data.themeColor)}${renderGenericSection('// SKILLS', data.skills, s => `<span style="display:inline-block; border:1px solid ${data.themeColor}; color:${data.themeColor}; padding: 0.2rem 0.6rem; border-radius: 4px; margin: 0.2rem; font-size:0.8rem;">${s.name}</span>`, data.themeColor)}</main>${renderFooter(data)}</div>`; };
        templates.impact = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : ''; return `<div id="cv-template" style="height:100%; padding:2.5rem; display:flex; flex-direction:column; ${bgStyle}"><header style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:4px solid ${data.themeColor}; padding-bottom:1rem; flex-wrap: wrap; gap: 0.5rem;"><h1 style="font-size:2.2rem; font-weight:700; line-height:1; flex-grow:1;">${getFullName(data.personalInfo)}</h1><div style="text-align:right; flex-shrink: 0;"><h2 style="font-size:1.1rem; color:${data.themeColor}; font-weight: 600;">${data.personalInfo.title}</h2><p style="font-size: 0.85rem;">${data.personalInfo.email} | ${data.personalInfo.phone}</p></div></header><div style="display:grid; grid-template-columns: 3fr 1fr; gap:2rem; flex-grow:1; margin-top:2rem;"><div>${renderGenericSection('Resumen', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="font-size:.9rem;line-height:1.6;white-space:pre-wrap">${item.text}</p>`, data.themeColor)}${renderGenericSection('Experiencia', data.experience, renderExperienceItem, data.themeColor)}</div><div>${renderGenericSection('Impacto Clave', data.impacts, item => `<div style="background:#f4f4f4; padding:0.8rem; border-left:4px solid ${data.themeColor}; margin-bottom:0.8rem; font-size:0.85rem;">${item.description}</div>`, data.themeColor)}${renderGenericSection('Habilidades', data.skills, s => `<p>${s.name}</p>`, data.themeColor)}</div></div></div>`; };
        templates.monochrome = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : 'background:white; color:#111;'; return `<div id="cv-template" style="height:100%; padding:3rem; ${bgStyle}"><header style="text-align:center; padding-bottom:1.5rem; border-bottom:2px solid #111; margin-bottom:1.5rem;"><h1 style="font-size:2.4rem; font-weight:300; letter-spacing:1px;">${getFullName(data.personalInfo)}</h1><h2 style="font-size:1.1rem; font-weight:500; letter-spacing:2px; color:#555;">${data.personalInfo.title}</h2></header><main style="font-size:0.9rem; line-height:1.8;">${renderGenericSection('PERFIL', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="white-space:pre-wrap">${item.text}</p>`, '#111')}${renderGenericSection('EXPERIENCIA', data.experience, renderExperienceItem, '#111')}${renderGenericSection('EDUCACIÓN', data.education, renderEducationItem, '#111')}</main>${renderFooter(data, {color:'#555', bgColor:'transparent', borderColor:'#eee'})}</div>`; };
        templates.swiss = (data) => { const bgStyle = data.backgroundGradient ? `background: ${data.backgroundGradient};` : 'background:#fff;'; return `<div id="cv-template" style="height:100%; display:grid; grid-template-columns: 1fr 2fr; grid-template-rows: auto 1fr; padding:3rem; ${bgStyle}"><header style="grid-column: 1 / -1; padding-bottom:1.5rem; margin-bottom:1.5rem; border-bottom:3px solid #111;"><h1 style="font-size:2.8rem; font-weight:700; letter-spacing:-1.5px; line-height:1;">${getFullName(data.personalInfo)}</h1></header><aside style="font-size:0.8rem; padding-right:2rem;"><h3 style="font-size:0.9rem; font-weight:700; letter-spacing:1px; margin-bottom:1rem; color:${data.themeColor};">CONTACTO</h3><p>${data.personalInfo.email}</p><p>${data.personalInfo.phone}</p><p>${data.personalInfo.website}</p>${renderGenericSection('HABILIDADES', data.skills, s => `<p>${s.name}</p>`, data.themeColor)}</aside><main style="padding-left:2rem; border-left:1px solid #eee;">${renderGenericSection('PERFIL', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="font-size:.9rem; line-height:1.6;white-space:pre-wrap">${item.text}</p>`, data.themeColor)}${renderGenericSection('EXPERIENCIA', data.experience, renderExperienceItem, data.themeColor)}${renderGenericSection('EDUCACIÓN', data.education, renderEducationItem, data.themeColor)}</main></div>`; };
        // ... (resto de plantillas sin cambios) ...

        // --- RENDERERS DE FORMULARIOS ---
        formRenderers.welcome = () => renderForm(`<div class="form-section" data-section="welcome"><h2 class="section-title">¡Bienvenido al Generador de CV Pro!</h2><p class="section-subtitle">Sigue estos sencillos pasos para crear tu currículum profesional.</p><div style="margin-top:2rem; display:flex; flex-direction:column; gap:1.5rem;"><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">1</div><div><h3 style="margin:0 0 0.2rem 0;">Personaliza el Diseño</h3><p style="color:var(--color-muted-text);">Ve a la sección "Diseño" para elegir una plantilla y tu color favorito.</p></div></div><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">2</div><div><h3 style="margin:0 0 0.2rem 0;">Completa las Secciones</h3><p style="color:var(--color-muted-text);">Usa la navegación para rellenar tu avatar, experiencia, educación y habilidades.</p></div></div><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">3</div><div><h3 style="margin:0 0 0.2rem 0;">Descarga y Triunfa</h3><p style="color:var(--color-muted-text);">Cuando estés listo, presiona "Descargar PDF" para obtener tu CV profesional.</p></div></div></div></div>`);
        
        formRenderers.design = () => { 
            const hexColor = cvData.themeColor.startsWith('#') ? cvData.themeColor : '#dc3545';
            renderForm(`<div class="form-section" data-section="design"><h2 class="section-title">Diseño y Apariencia</h2><p class="section-subtitle">Personaliza cómo se ve tu currículum.</p>
                <div class="subsection-title">Color de Acento</div>
                <div class="colors"><div class="color-dot ${cvData.themeColor==='#0d6efd'?'active':''}" data-color-value="#0d6efd" style="background:#0d6efd"></div><div class="color-dot ${cvData.themeColor==='#198754'?'active':''}" data-color-value="#198754" style="background:#198754"></div><div class="color-dot ${cvData.themeColor==='#6f42c1'?'active':''}" data-color-value="#6f42c1" style="background:#6f42c1"></div><div class="color-dot ${cvData.themeColor==='#dc3545'?'active':''}" data-color-value="#dc3545" style="background:#dc3545"></div><div class="color-dot ${cvData.themeColor==='#525f7f'?'active':''}" data-color-value="#525f7f" style="background:#525f7f"></div><div class="color-dot ${cvData.themeColor==='#e83e8c'?'active':''}" data-color-value="#e83e8c" style="background:#e83e8c"></div><input type="color" id="custom-color-picker" value="${hexColor}"></div>
                
                <div class="subsection-title">Plantilla del CV</div>
                <div class="layout-selector">${Object.keys(templates).map(layout => `<div class="layout-card ${cvData.layout === layout ? 'active' : ''}" data-layout="${layout}"><div class="mini-preview-container"></div><p style="text-transform: capitalize;">${layout.replace('_', ' ')}</p></div>`).join('')}</div>
                
                <div class="subsection-title">Fondo del CV</div>
                <div class="form-group">
                    <label>Fondos Prediseñados</label>
                    <div class="gradient-selector">${gradientPresets.map(grad => `<div class="gradient-swatch ${cvData.backgroundGradient === grad ? 'active' : ''}" style="background: ${grad};" data-gradient-value="${grad}"></div>`).join('')}</div>
                </div>
                <div class="form-group">
                    <label for="background-gradient-input">Fondo Personalizado</label>
                    <p style="color:var(--color-muted-text); margin-bottom: 0.5rem; font-size: 0.85rem;">Pega un gradiente de <a href="https://www.gradientmagic.com/" target="_blank">Gradient Magic</a> o pídele uno nuevo a ChatGPT.</p>
                    <textarea id="background-gradient-input" rows="3" placeholder="Pega el código CSS de un 'linear-gradient' o 'radial-gradient' aquí...">${cvData.backgroundGradient || ''}</textarea>
                </div>
            </div>`);
        };
        // ... (resto de formRenderers sin cambios) ...
        formRenderers.personal = () => {const p=cvData.personalInfo;renderForm(`<div class="form-section" data-section="personal"><h2 class="section-title">Información Personal</h2><p class="section-subtitle">Los datos básicos para que puedan contactarte.</p><div class="form-grid"><div class="form-group"><label>Nombre(s)</label><input type="text" name="firstName" value="${p.firstName||''}"></div><div class="form-group"><label>Apellidos</label><input type="text" name="lastName" value="${p.lastName||''}"></div></div><div class="form-group"><label>Profesión</label><input type="text" name="title" value="${p.title||''}"></div><div class="form-grid"><div class="form-group"><label>Email</label><input type="email" name="email" value="${p.email||''}"></div><div class="form-group"><label>Teléfono</label><input type="tel" name="phone" value="${p.phone||''}"></div></div><div class="form-group"><label>Dirección</label><input type="text" name="address" value="${p.address||''}"></div><div class="form-group"><label>Web (sin https://)</label><input type="text" name="website" value="${p.website||''}"></div><div class="form-group"><label>Resumen</label><textarea name="summary" rows="5">${p.summary||''}</textarea></div></div>`)};
    };

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
        const templateFn = templates[layout];
        if(typeof templateFn !== 'function') {
            console.error(`La plantilla "${layout}" no existe o no es una función.`);
            cvPreviewWrapper.innerHTML = `<div style="padding:2rem; text-align:center; color:red;">Error: La plantilla seleccionada no se pudo cargar.</div>`;
            return;
        }
        cvPreviewWrapper.innerHTML = templateFn(cvData);
    };
    
    const setActiveSection = (sectionName) => {
        if (!sectionName) return;
        document.querySelectorAll('.editor-nav .nav-item').forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${sectionName}`));
        
        const renderer = formRenderers[sectionName];
        if (typeof renderer === 'function') {
            renderer(); 

            if (sectionName === 'design') {
                document.querySelectorAll('.layout-selector .mini-preview-container').forEach(container => {
                    const layoutCard = container.closest('.layout-card');
                    if (layoutCard) {
                        const layoutName = layoutCard.dataset.layout;
                        const templateFn = templates[layoutName];
                        if (templateFn) {
                            container.innerHTML = templateFn(cvData);
                        }
                    }
                });
            }
        } else {
            console.error(`No se encontró un renderer para la sección: "${sectionName}"`);
            formWrapper.innerHTML = `<div class="form-section active"><h2 class="section-title">Error</h2><p>No se pudo cargar esta sección.</p></div>`;
        }
    };

    // --- 5. INITIALIZATION & EVENT LISTENERS ---
    function init() {
        buildTemplateAndFormFunctions();
        downloadPdfBtn.addEventListener('click', () => window.print());
        document.querySelectorAll('.editor-nav .nav-item').forEach(item => {
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
            } else if (target.id === 'background-gradient-input') {
                cvData.backgroundGradient = target.value;
                // Desmarcar visualmente los presets si se escribe uno personalizado
                document.querySelectorAll('.gradient-swatch.active').forEach(swatch => swatch.classList.remove('active'));
            } else if (section === 'design' && target.id === 'custom-color-picker') {
                cvData.themeColor = target.value;
            } 
            // ... resto del listener sin cambios ...
            
            renderCVPreview();
        });

        formWrapper.addEventListener('click', (e) => {
            const button = e.target.closest('button, .layout-card, .color-dot, .gradient-swatch'); // Añadido .gradient-swatch
            if (!button) return;

            let action = button.dataset.action;
            if (button.classList.contains('layout-card')) action = 'selectLayout';
            else if (button.classList.contains('color-dot')) action = 'selectColor';
            else if (button.classList.contains('gradient-swatch')) action = 'selectGradient'; // Nueva acción

            if (action) {
                if (action === 'selectLayout') {
                    cvData.layout = button.dataset.layout;
                } else if (action === 'selectColor') {
                    cvData.themeColor = button.dataset.colorValue;
                } else if (action === 'selectGradient') {
                    cvData.backgroundGradient = button.dataset.gradientValue;
                }
                
                setActiveSection('design');
                renderCVPreview();
            }
        });
        
        setActiveSection('welcome');
        renderCVPreview();
    }

    init();
});