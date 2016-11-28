import { UsuarioRole } from './../../shared/entity/usuarioRole';
import { RoleService } from './../../shared/service/role.service';
import { Role } from './../../shared/entity/role';
import { UsuarioService } from './../../shared/service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { Usuario } from '../../shared/entity/usuario';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './cadastrar-usuario.component.html',
    providers: [UsuarioService]
})

export class CadastrarUsuarioComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    usuario: Usuario;
    usuarios: Usuario[];
    roles: Role[];
    rolesSelected: Role[];

    /**
     * Construtor
     */
    constructor(private usuarioService: UsuarioService, private roleService: RoleService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.usuario = new Usuario();
        this.recuperarUsuariosAtivo();
        this.recuperarRoles();
    }

    /**
     * Grava novo usuário
     */
    public gravar(event: any): void {
        event.preventDefault();
        this.associarRoleToUsuario();
        this.usuarioService.incluirUsuario(this.usuario)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
    }

    /**
     * Recuperar todos os usuários ativos
     */
    public recuperarUsuariosAtivo(): void {
        this.usuarioService.recuperarUsuariosAtivo()
            .subscribe(
            data => {
                this.usuarios = data.objeto;
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

    /**
     * Recuperar todas as roles
     */
    public recuperarRoles(): void {
        this.roleService.recuperarRoles()
            .subscribe(
            data => {
                this.roles = data.objeto;
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

    private associarRoleToUsuario(): void {
        let usuarioRoles: UsuarioRole[];

        this.rolesSelected.forEach((r) => {
            let ur: UsuarioRole = new UsuarioRole();
            ur.role = r;
            ur.usuario = this.usuario;
            usuarioRoles.push(ur);
        });

        this.usuario.authorities = usuarioRoles;
    }

}
