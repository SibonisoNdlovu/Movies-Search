using films_assignment_api.Configuration;
using films_assignment_api.DataLayer;
using films_assignment_api.DataLayer.Models;
using Microsoft.AspNetCore.OData;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;

var builder = WebApplication.CreateBuilder(args);

static IEdmModel GetEdmModel() {
    ODataConventionModelBuilder oBuilder = new();
    oBuilder.EntitySet<Film>("Films");
    return oBuilder.GetEdmModel(); 
} 

// Add services to the container.

builder.Services.AddControllers().AddOData(opt => 
    opt.AddRouteComponents("api", GetEdmModel()).Select().Filter().SkipToken().Equals(true).CompareTo(true)
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<LiteDbOptions>(builder.Configuration.GetSection("LiteDbOptions"));
builder.Services.AddSingleton<ILiteDbContext, LiteDbContext>();
builder.Services.AddTransient(typeof(DbService<>));


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseStaticFiles();
app.UseAuthorization();
app.UseCors();

app.MapControllers();

app.Run();
