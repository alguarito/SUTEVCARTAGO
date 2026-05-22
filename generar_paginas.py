import os

cargos = [
  {"id": "presidencia", "cargo": "Presidencia", "ini": "P", "desc": "Representación legal y política del sindicato. Convoca y preside las asambleas y reuniones de junta directiva, suscribe contratos y lidera la ejecución de las políticas sindicales."},
  {"id": "vicepresidencia", "cargo": "Vicepresidencia", "ini": "VP", "desc": "Reemplaza a la Presidencia en sus ausencias y apoya activamente en la coordinación, organización y gestión general de la subdirectiva."},
  {"id": "general", "cargo": "Secretaría General", "ini": "SG", "desc": "Responsable del archivo, correspondencia y la administración general del sindicato. Coordina el registro de afiliados y dirige a la Secretaría de Actas."},
  {"id": "tesoreria", "cargo": "Tesorería", "ini": "T", "desc": "Administra el patrimonio del sindicato, recauda las cuotas, rinde informes financieros y elabora el proyecto de presupuesto de la subdirectiva."},
  {"id": "fiscalia", "cargo": "Fiscalía", "ini": "F", "desc": "Ejerce control y vigilancia sobre la gestión administrativa y financiera de la junta. Revisa las cuentas y vela por el estricto cumplimiento de los estatutos."},
  {"id": "laboral", "cargo": "Sec. Asuntos Laborales y Jurídicos", "ini": "SJ", "desc": "Atiende los reclamos laborales, brinda asesoría jurídica a los afiliados y tramita las quejas por violación de derechos ante las autoridades competentes."},
  {"id": "organizacion", "cargo": "Sec. Organización y Ed. Sindical", "ini": "SO", "desc": "Promueve la afiliación, organiza las bases sindicales y coordina los programas de formación política y sindical para fortalecer la conciencia de clase."},
  {"id": "prensa", "cargo": "Sec. Prensa y Comunicaciones", "ini": "SP", "desc": "Dirige los órganos de difusión del sindicato, maneja la imagen institucional y mantiene informados a los afiliados sobre la actualidad del gremio."},
  {"id": "cultura", "cargo": "Sec. de Cultura, Deporte y Bienestar", "ini": "SC", "desc": "Organiza eventos culturales, jornadas deportivas y fomenta el bienestar integral, la recreación y la integración de los maestros y sus familias."},
  {"id": "genero", "cargo": "Sec. de Género, Igualdad e Inclusión", "ini": "SG", "desc": "Promueve políticas de equidad de género, lucha contra todo tipo de discriminación y defiende los derechos de la mujer y las minorías en el magisterio."},
  {"id": "salud", "cargo": "Sec. de Salud", "ini": "SS", "desc": "Vigila la correcta prestación del servicio médico-asistencial del FOMAG, atiende reclamos de salud y lidera campañas de salud ocupacional."},
  {"id": "ceid", "cargo": "Sec. de Asuntos Educativos y CEID", "ini": "SE", "desc": "Lidera el Centro de Estudios e Investigaciones Docentes, fomenta la pedagogía crítica, la investigación educativa y el debate sobre el sistema escolar."},
  {"id": "derechoshumanos", "cargo": "Sec. Derechos Humanos y Paz", "ini": "DH", "desc": "Denuncia amenazas, acompaña a docentes en situación de riesgo, promueve la cultura de paz escolar y defiende los derechos fundamentales del magisterio."},
  {"id": "trabajadores", "cargo": "Sec. Trabajadores de la Edu. y Etnoeducadores", "ini": "ST", "desc": "Asuntos Intergremiales y Cooperativos y Etnoeducadores."},
  {"id": "institutos", "cargo": "Sec. de Institutos Técnicos, Nocturnas y 1278", "ini": "SI", "desc": "Atención a docentes 1278, representación de institutos técnicos y mediación de conflictos en jornadas nocturnas."},
  {"id": "seguridadsocial", "cargo": "Sec. de Seguridad Social, Territoriales y Pensionados", "ini": "SS", "desc": "Estudio y trámite de servicios prestacionales, apoyo a docentes territoriales y bienestar para pensionados."},
  {"id": "municipios", "cargo": "Sec. de Municipios Certificados y Asuntos de Cali", "ini": "SM", "desc": "Defensa de la Educación Pública, representación en municipios certificados y coordinación de los Asuntos de Cali."},
  {"id": "actas", "cargo": "Sec. de Actas", "ini": "SA", "desc": "Gestión de actas, registro de asistencia y apoyo directo a la Secretaría General en el archivo y control documental."}
]

template = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{cargo} - SUTEV Cartago</title>
<link rel="stylesheet" href="css/styles.css">
</head>
<body>

<header class="header scrolled" id="header" style="background: rgba(255,255,255,0.97); box-shadow: var(--shadow-sm);">
<div class="container">
<a href="index.html" class="header__logo"><img src="LOGO.png" alt="SUTEV"><div class="header__logo-text">SUTEV Cartago<span>Norte del Valle</span></div></a>
<nav><ul class="nav__list" id="navList">
<li><a href="index.html" class="nav__link">← Volver al Inicio</a></li>
<li><a href="index.html#junta" class="nav__link">Junta Directiva</a></li>
<li><a href="#perfil" class="nav__link">El Secretario</a></li>
</ul></nav>
</div>
</header>

<section class="hero" style="min-height: 50vh; padding-top: 100px; padding-bottom: 60px;">
<div class="hero__bg" style="opacity: 0.1;"></div>
<div class="hero__overlay" style="background: linear-gradient(180deg, rgba(10,61,31,0.9) 0%, rgba(10,10,10,0.95) 100%);"></div>
<div class="container" style="position: relative; z-index: 2;">
<div class="hero__badge">Secretaría Oficial</div>
<h1 style="color: var(--white); margin-bottom: 20px;">{cargo}</h1>
<p class="hero__subtitle" style="max-width: 800px;">{desc}</p>
</div>
</section>

<section class="section" id="perfil">
<div class="container">
<div class="about__grid" style="grid-template-columns: 1fr 2fr; gap: 40px; align-items: start;">
<div class="form-card reveal" style="text-align: center; padding: 40px 20px;">
  <div style="width: 140px; height: 140px; background: var(--green-600); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 4rem; color: white; margin: 0 auto 24px; font-weight: bold; font-family: var(--font-heading); box-shadow: var(--shadow-md);">
    {ini}
  </div>
  <h3 style="font-size: 1.5rem; color: var(--green-900); margin-bottom: 8px;">Por Definir</h3>
  <p style="color: var(--green-600); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px;">Titular del Cargo</p>
  <a href="mailto:por_definir@sutev.org" class="btn btn--primary" style="width: 100%; justify-content: center;">✉️ Contactar</a>
</div>

<div class="reveal">
  <h2 class="section__title" style="margin-bottom: 16px; font-size: 1.8rem; text-align: left;">Funciones Estatutarias</h2>
  <p style="color: var(--gray-600); font-size: 1.05rem; margin-bottom: 30px; font-weight: 600;">Son funciones y responsabilidades de esta dependencia:</p>
  
  <style>
    .estatuto-card {{ background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-md); padding: 24px; position: relative; transition: var(--transition); box-shadow: var(--shadow-sm); overflow: hidden; display: flex; flex-direction: column; }}
    .estatuto-card:hover {{ transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--green-300); }}
    .estatuto-card__bg {{ position: absolute; top: -10px; right: 10px; font-size: 6rem; font-family: var(--font-heading); font-weight: 900; color: var(--green-50); z-index: 1; user-select: none; line-height: 1; }}
    .estatuto-card__content {{ position: relative; z-index: 2; flex-grow: 1; }}
    .estatuto-card__badge {{ display: inline-flex; align-items: center; justify-content: center; background: var(--green-600); color: var(--white); font-weight: 700; width: 32px; height: 32px; border-radius: 50%; margin-bottom: 16px; font-family: var(--font-heading); }}
    .estatuto-card p {{ font-size: 0.92rem; color: var(--gray-700); line-height: 1.6; }}
    .estatutos__grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px; }}
  </style>

  <div class="estatutos__grid">
    <div class="estatuto-card reveal"><div class="estatuto-card__bg">a</div><div class="estatuto-card__content"><div class="estatuto-card__badge">A</div><p>[ESPACIO PARA EDITAR] Reemplazar por el literal A correspondiente en los estatutos oficiales.</p></div></div>
    <div class="estatuto-card reveal"><div class="estatuto-card__bg">b</div><div class="estatuto-card__content"><div class="estatuto-card__badge">B</div><p>[ESPACIO PARA EDITAR] Reemplazar por el literal B correspondiente en los estatutos oficiales.</p></div></div>
    <div class="estatuto-card reveal"><div class="estatuto-card__bg">c</div><div class="estatuto-card__content"><div class="estatuto-card__badge">C</div><p>[ESPACIO PARA EDITAR] Reemplazar por el literal C correspondiente en los estatutos oficiales.</p></div></div>
    <div class="estatuto-card reveal"><div class="estatuto-card__bg">d</div><div class="estatuto-card__content"><div class="estatuto-card__badge">D</div><p>[ESPACIO PARA EDITAR] Reemplazar por el literal D correspondiente en los estatutos oficiales.</p></div></div>
    <div class="estatuto-card reveal"><div class="estatuto-card__bg">e</div><div class="estatuto-card__content"><div class="estatuto-card__badge">E</div><p>[ESPACIO PARA EDITAR] Reemplazar por el literal E correspondiente en los estatutos oficiales.</p></div></div>
  </div>

</div>
</div>
</div>
</section>

<footer class="footer">
<div class="container">
<div class="footer__grid">
<div class="footer__brand"><a href="index.html" class="header__logo"><img src="LOGO.png" alt="SUTEV" style="height:40px"><div class="header__logo-text" style="color:var(--green-400)">SUTEV Cartago<span style="color:var(--gray-500)">Norte del Valle</span></div></a><p>Sindicato Único de Trabajadores de la Educación del Valle. Subdirectiva Cartago — Filial de FECODE.</p></div>
<div><div class="footer__title">Navegación</div><ul class="footer__links"><li><a href="index.html">Volver al Inicio</a></li></ul></div>
</div>
<div class="footer__bottom">© 2026 SUTEV Cartago — Subdirectiva Norte del Valle. Todos los derechos reservados.</div>
</div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
"""

for c in cargos:
    filename = f"secretaria-{c['id']}.html"
    if os.path.exists(filename):
        print(f"Omitido (ya existe): {filename}")
        continue
    content = template.format(cargo=c['cargo'], desc=c['desc'], ini=c['ini'])
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generado {filename}")
