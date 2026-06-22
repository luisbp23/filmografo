import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel implements OnInit {
  private adminService = inject(AdminService);

  activeTab = 'filmes';
  filmesPendentes: any[] = [];
  seriesPendentes: any[] = [];
  denunciasPendentes: any[] = [];

  async ngOnInit() {
    await this.carregarDados();
  }

  async carregarDados() {
    this.filmesPendentes = await this.adminService.getConteudoPendente('movie');
    this.seriesPendentes = await this.adminService.getConteudoPendente('tv');
    this.denunciasPendentes = await this.adminService.getDenunciasPendentes();
  }

  async aprovar(id: number) {
    await this.adminService.aprovar(id);
    await this.carregarDados();
  }

  async rejeitar(id: number) {
    await this.adminService.rejeitar(id);
    await this.carregarDados();
  }

  async resolverDenuncia(id: number) {
    await this.adminService.resolverDenuncia(id);
    await this.carregarDados();
  }

  async ignorarDenuncia(id: number) {
    await this.adminService.ignorarDenuncia(id);
    await this.carregarDados();
  }
}