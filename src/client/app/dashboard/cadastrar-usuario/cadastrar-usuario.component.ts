import { UsuarioRole } from './../../shared/entity/usuarioRole';
import { RoleService } from './../../shared/service/role.service';
import { Role } from './../../shared/entity/role';
import { UsuarioService } from './../../shared/service/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { Usuario } from '../../shared/entity/usuario';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './cadastrar-usuario.component.html',
    providers: [UsuarioService, RoleService]
})

export class CadastrarUsuarioComponent implements OnInit {
    /*Variaveis*/
    @ViewChild('modalDisabilitar') public modalDisabilitar: ModalDirective;
    alertaUtil: AlertaUtil = new AlertaUtil();
    usuario: Usuario;
    usuarioModal: Usuario;
    usuarios: Usuario[];
    usuariosDisabilitados: Usuario[];
    roles: Role[];
    rolesSelected: Role[];
    activeForm: boolean = true;

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
        this.recuperarUsuariosInativo();
        this.recuperarRoles();
    }

    public novo() {
        this.usuario = new Usuario();
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
    }

    /**
     * Grava novo usuário
     */
    public gravar(event: any): void {
        event.preventDefault();

        this.usuarioService.incluirUsuario(this.usuario, this.rolesSelected)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.novo();
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
     * Recuperar todos os usuários inativos
     */
    public recuperarUsuariosInativo(): void {
        this.usuarioService.recuperarUsuariosInativo()
            .subscribe(
            data => {
                this.usuariosDisabilitados = data.objeto;
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

    public getRolesUsuario(usuario: Usuario): string {
        let result: string;
        usuario.authorities.forEach((e) => {
            if (e.authority) {
                if (!result) {
                    result = e.authority;
                } else {
                    result = result + ', ' + e.authority;
                }
            }

        });
        return result;
    }

    public showModalDisabilitar(usuario: Usuario): void {
        this.usuarioModal = usuario;        
        this.modalDisabilitar.show();
    }

    public inativarusuario( event: any ): void {
        event.preventDefault();
        this.usuarioService.inativarUsuario( this.usuarioModal )
            .subscribe(
            result => {
                this.recuperarUsuariosAtivo();
                this.modalDisabilitar.hide();               
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
                    msg: err.message
                });
            });
    }

}
