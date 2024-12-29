import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

/* import { ExcelModule } from './excel/excel.module'; */
/* import { DataPrincipalModule } from './data-principal/data-principal.module';
import { TasaDolarModule } from './tasa-dolar/tasa-dolar.module';
import { ProgramasModule } from './programas/programas.module';
import { AgenciasModule } from './agencias/agencias.module';
import { CierreDiarioModule } from './cierre-diario/cierre-diario.module';
import { CajeroCierreDiarioModule } from './cajero-cierre-diario/cajero-cierre-diario.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { PremiosModule } from './premios/premios.module';
import { BancaModule } from './banca/banca.module'; */
import { UserModule } from './user/user.module';
import { CuentasContablesModule } from './cuentas-contables/cuentas-contables.module';
import { LibroDiarioModule } from './libro-diario/libro-diario.module';
import { LibroMayorModule } from './libro-mayor/libro-mayor.module';
import { SeedModule } from './seed/seed.module';
import { CompanyModule } from './company/company.module';
import { RolesModule } from './roles/roles.module';
import { CompanyPlanModule } from './company-plan/company-plan.module';
import { BalanceComprobacionModule } from './balance-comprobacion/balance-comprobacion.module';
import { BalanceGeneralModule } from './balance-general/balance-general.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   serveRoot: '/post/',
    //   rootPath: join(__dirname, '..', 'static/uploads/filePost'),
    // }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    CuentasContablesModule,
    LibroDiarioModule,
    LibroMayorModule,
    SeedModule,
    CompanyModule,
    RolesModule,
    CompanyPlanModule,
    BalanceComprobacionModule,
    BalanceGeneralModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
