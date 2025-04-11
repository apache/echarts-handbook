<template>
    <nav role="navigation" class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header"><button type="button" data-toggle="collapse" data-target="#navbar-collapse"
                    aria-expanded="false" class="navbar-toggle collapsed"><span class="sr-only">Toggle
                        navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span
                        class="icon-bar"></span></button><a href="https://echarts.apache.org/en/index.html"
                    class="navbar-brand"><img src="https://echarts.apache.org/en/images/logo.png?_v_=20240226"
                        alt="echarts logo" class="navbar-logo" /></a></div>
            <div id="navbar-collapse" class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-left">
                    <li id="nav-index"><a href="https://echarts.apache.org/en/index.html">Inicio</a></li>
                    <li id="nav-doc" class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">Docs<b
                                class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="https://echarts.apache.org/en/feature.html">Características</a></li>
                            <li><a href="https://echarts.apache.org/handbook/en/get-started/">Manual</a></li>
                            <li><a href="https://echarts.apache.org/en/api.html">API</a></li>
                            <li><a href="https://echarts.apache.org/en/option.html">Configuración de gráficos</a></li>
                            <li><a href="https://echarts.apache.org/en/changelog.html">Registro de cambios</a></li>
                            <li><a href="https://echarts.apache.org/en/faq.html">FAQ</a></li>
                            <li><a href="https://echarts.apache.org/handbook/en/basics/release-note/v5-upgrade-guide">Guía de actualización V5</a></li>
                        </ul>
                    </li>
                    <li id="nav-download" class="dropdown"><a href="#" data-toggle="dropdown"
                            class="dropdown-toggle">Descargar<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="https://echarts.apache.org/en/download.html">Descargar</a></li>
                            <li><a href="https://echarts.apache.org/en/download-theme.html">Descargar Temas</a></li>
                            <li><a href="https://echarts.apache.org/en/download-extension.html">Descargar Extensiones</a>
                            </li>
                        </ul>
                    </li>
                    <li id="nav-examples"><a href="https://echarts.apache.org/examples/en/index.html">Ejemplos</a></li>
                    <li id="nav-resources"><a href="#" data-toggle="dropdown" class="dropdown-toggle">Recursos<b
                                class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="https://echarts.apache.org/en/spreadsheet.html">Herramienta de hojas de cálculo</a></li>
                            <li><a href="https://echarts.apache.org/en/theme-builder.html">Generador de temas</a></li>
                            <li><a href="https://echarts.apache.org/en/cheat-sheet.html">Hoja de referencia rápida</a></li>
                            <li><a href="https://echarts.apache.org/en/resources.html">Más recursos</a></li>
                        </ul>
                    </li>
                    <li id="nav-contribute"><a href="#" data-toggle="dropdown" class="dropdown-toggle">Comunidad<b
                                class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="https://echarts.apache.org/en/events.html">Eventos</a></li>
                            <li><a href="https://echarts.apache.org/en/committers.html">Desarrolladores</a></li>
                            <li><a href="https://echarts.apache.org/en/maillist.html">Lista de Correos</a></li>
                            <li><a href="https://echarts.apache.org/en/contributing.html">Como contribuir</a></li>
                            <li><a href="https://echarts.apache.org/en/dependencies.html">Dependencias</a></li>
                            <li><a href="https://echarts.apache.org/en/coding-standard.html">Estandares de código</a></li>
                            <li><a href="https://github.com/apache/echarts" target="_blank">Código fuente<svg
                                        width="15px" height="15px" viewbox="0 0 100 100" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        class="icon-external-link">
                                        <path fill="currentColor"
                                            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
                                        </path>
                                        <polygon fill="currentColor"
                                            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
                                        </polygon>
                                    </svg></a></li>
                            <li><a href="https://github.com/apache/echarts/issues" target="_blank">Issues (GitHub)<svg
                                        width="15px" height="15px" viewbox="0 0 100 100" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        class="icon-external-link">
                                        <path fill="currentColor"
                                            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
                                        </path>
                                        <polygon fill="currentColor"
                                            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
                                        </polygon>
                                    </svg></a></li>
                        </ul>
                    </li>
                    <li id="nav-others"><a href="#" data-toggle="dropdown" class="dropdown-toggle">ASF<b
                                class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="https://www.apache.org/" target="_blank">Apache Software Foundation<svg
                                        width="15px" height="15px" viewbox="0 0 100 100" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        class="icon-external-link">
                                        <path fill="currentColor"
                                            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
                                        </path>
                                        <polygon fill="currentColor"
                                            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
                                        </polygon>
                                    </svg></a></li>
                            <li><a href="https://echarts.apache.org/en/security.html">Seguridad</a></li>
                            <li><a href="https://www.apache.org/licenses/" target="_blank">License<svg width="15px"
                                        height="15px" viewbox="0 0 100 100" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        class="icon-external-link">
                                        <path fill="currentColor"
                                            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
                                        </path>
                                        <polygon fill="currentColor"
                                            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
                                        </polygon>
                                    </svg></a></li>
                            <li><a href="https://www.apache.org/events/current-event" target="_blank">Eventos<svg
                                        width="15px" height="15px" viewbox="0 0 100 100" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        class="icon-external-link">
                                        <path fill="currentColor"
                                            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
                                        </path>
                                        <polygon fill="currentColor"
                                            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
                                        </polygon>
                                    </svg></a></li>
                            <li><a href="https://www.apache.org/foundation/sponsorship.html"
                                    target="_blank">Sponsorship<svg width="15px" height="15px" viewbox="0 0 100 100"
                                        version="1.1" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" class="icon-external-link">
                                        <path fill="currentColor"
                                            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
                                        </path>
                                        <polygon fill="currentColor"
                                            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
                                        </polygon>
                                    </svg></a></li>
                            <li><a href="https://www.apache.org/foundation/thanks.html" target="_blank">Gracias<svg
                                        width="15px" height="15px" viewbox="0 0 100 100" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        class="icon-external-link">
                                        <path fill="currentColor"
                                            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
                                        </path>
                                        <polygon fill="currentColor"
                                            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
                                        </polygon>
                                    </svg></a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li id="nav-homeen"><a href="javascript:;" onclick="changeLang('es')">ES</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>