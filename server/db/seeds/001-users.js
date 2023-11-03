/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  return knex('users').del() // Limpa todos os registros existentes na tabela
    .then(function () {
      return knex('users').insert([
        {
          first_name: 'Julio',
          last_name: 'Rodrigues',
          email: 'gonzalez@gonzalez.com',
          age: 35,
          weight: 82.5,
          height: 185.0,
          gender: 'M',
          goals: 'Ganho de massa magra',
          description: 'Praticante de musculação',
          gym_attended: 'Academia A',
          hashed_password: 'hashed_password_here', 
          salt: 'salt_here', 
        },
        {
          first_name: 'Maria',
          last_name: 'Santos',
          email: 'maria@example.com',
          age: 28,
          weight: 62.0,
          height: 160.5,
          gender: 'F',
          goals: 'Perda de peso',
          description: 'Adepta de exercícios aeróbicos',
          gym_attended: 'Academia B',
          hashed_password: 'hashed_password_here', 
          salt: 'salt_here', 
        },
      ]);
    });
};