using Core.Entities;
using Infrastucture;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Helpers
{
    public class ToDoListAppDbInitializer
    {
        public static void Init(IApplicationBuilder app)
        {
            using (var services = app.ApplicationServices.CreateScope())
            {
                var context = services.ServiceProvider.GetRequiredService<ToDoListAppDBContext>();
                if (!context.Tags.Any())
                {
                    context.Tags.Add(new Tag { Name = "Funny" });
                    context.Tags.Add(new Tag { Name = "Informative" });
                    context.Tags.Add(new Tag { Name = "Education" });
                    context.Tags.Add(new Tag { Name = "Relax" });
                }
                context.SaveChanges();
            }
        }
    }
}
