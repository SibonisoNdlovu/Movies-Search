using films_assignment_api.Configuration;
using LiteDB;
using Microsoft.Extensions.Options;

namespace films_assignment_api.DataLayer
{
    public interface ILiteDbContext
    {
        LiteDatabase Database { get; }
    }
    public class LiteDbContext : ILiteDbContext
    {
        public LiteDatabase Database { get; }

        public LiteDbContext(IOptions<LiteDbOptions> options)
        {
            Database = new LiteDatabase(options.Value.DatabaseLocation);
        }
    }
}
