using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Auth;
using TMS.Auth.Interfaces;
using TMS.Repositories;
using TMS.Repositories.Data;
using TMS.Repositories.Interfaces;

namespace TMS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors
            (options => options.AddPolicy("AllowEverything",
                builder => builder.
                AllowAnyOrigin().
                AllowAnyMethod().
                AllowAnyHeader()));

            services.AddAuthentication(authOption =>
            {
                authOption.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOption.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).
            AddJwtBearer(jwtOption =>
            {
                string key = Configuration.GetValue<string>("JwtConfig:Key");
                byte[] keyByte = Encoding.ASCII.GetBytes(key);
                jwtOption.SaveToken = true;
                jwtOption.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(keyByte),
                    ValidateLifetime = true,
                    ValidateAudience = false,
                    ValidateIssuer = false
                };
            });

            // Add Entity Framework
            services.AddDbContextPool<AppDbContext>
                (options => options.UseSqlServer(Configuration.GetConnectionString("TrainingAngularDBConnection")));

            services.AddControllers(options =>
            {
                var jsonInputFormatter = options.InputFormatters
                    .OfType<Microsoft.AspNetCore.Mvc.Formatters.SystemTextJsonInputFormatter>()
                    .Single();
                //jsonInputFormatter.SupportedMediaTypes.Add("application/csp-report");
                jsonInputFormatter.SupportedMediaTypes.Add("application/json");
            });

            services.AddSingleton<IJwtTokenManager, JwtTokenManager>();
            services.AddScoped<ITenderRepository, TenderRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowEverything");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
